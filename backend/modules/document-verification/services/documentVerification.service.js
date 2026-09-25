import fs from "fs";
import path from "path";
import { getAIClient, getDeploymentName } from "../../../config/azureOpenAI.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";

const SYSTEM_PROMPT = `You are a strict document verification assistant.
Your job is to perform strict validity checks on uploaded documents for a marathon registration.
You will receive an image and the declared document type.
You must check the following:
1. Does the image generally look like the declared document type?
2. Is the text clear and readable?
3. Strict Age Check (18+ ONLY): You MUST extract the Date of Birth (DOB) from the document and calculate the person's age. If the person is under 18 years old, or if a clear DOB is not visible, you MUST return verified: false.
4. Strict Document Type Match: 
   - If the type is "10th Marksheet", the document must be for 10th standard (High School / Secondary). If it says "12th", "XII", "Intermediate", or "Senior Secondary", return verified: false.
   - If the type is "12th Marksheet", the document must be for 12th standard. If it is clearly a 10th standard document, return verified: false.
   - If the type is "PAN CARD", it must contain a standard PAN number format and terms like "Income Tax Department".

Do NOT claim "Government database confirms this is genuine". You cannot verify government-level authenticity, only document type, readability, and the above strict conditions.

Respond strictly in valid JSON format:
{
  "verified": boolean,
  "reason": "string explaining the result (e.g., '10th Marksheet verified successfully and age is 18+.' or 'Document valid, but age is under 18.' or 'Uploaded document is a 12th marksheet but 10th was selected.')"
}
Do not include any markdown formatting like \`\`\`json. Return only the JSON object.`;

/* ================================================================
 *  SHARED HELPERS — DOB extraction & age calculation
 * ================================================================ */

// Given DD/MM/YYYY → age in years, or null if invalid
const computeAge = (day, month, year) => {
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;
  if (year < 1950 || year > new Date().getFullYear()) return null;

  const today = new Date();
  let age = today.getFullYear() - year;
  if (
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day)
  ) {
    age--;
  }
  return age;
};

// Extract DOB ONLY from near "DOB" / "Date of Birth" / "जन्म तिथि" labels
// Marksheet me multiple dates hoti hain (exam date, issue date, photo date) — sirf label wali chahiye
const extractDOBFromLabel = (text) => {
  if (!text) return null;

  const cleanText = text.replace(/\s+/g, " ").trim();
  const upperText = cleanText.toUpperCase();

  // Labels jo DOB ke paas hote hain
  const dobLabels = [
    "DATE OF BIRTH",
    "DATEOFBIRTH",
    "DOB",
    "D.O.B",
    "D O B",
    "BIRTH DATE",
    "BIRTHDATE",
    "BORN ON",
    "BORN",
    "जन्म तिथि",
    "जन्मतिथि",
    "जन्म",
  ];

  const dateRegexes = [
    /\b(\d{1,2})[\-\/\.](\d{1,2})[\-\/\.](\d{4})\b/g, // DD/MM/YYYY
    /\b(\d{4})[\-\/\.](\d{1,2})[\-\/\.](\d{1,2})\b/g, // YYYY/MM/DD
  ];

  for (const label of dobLabels) {
    let searchFrom = 0;
    while (true) {
      const idx = upperText.indexOf(label.toUpperCase(), searchFrom);
      if (idx === -1) break;

      // Window: label ke baad 80 chars (date label ke aage likhi hoti hai)
      const windowStart = idx;
      const windowEnd = Math.min(cleanText.length, idx + label.length + 80);
      const windowText = cleanText.slice(windowStart, windowEnd);

      for (const regex of dateRegexes) {
        regex.lastIndex = 0;
        let match;
        while ((match = regex.exec(windowText)) !== null) {
          let day, month, year;
          if (match[1].length === 4) {
            year = parseInt(match[1]);
            month = parseInt(match[2]);
            day = parseInt(match[3]);
          } else {
            day = parseInt(match[1]);
            month = parseInt(match[2]);
            year = parseInt(match[3]);
          }

          const age = computeAge(day, month, year);
          if (age !== null && age >= 10 && age <= 100) {
            return { day, month, year, age, source: `label:${label}` };
          }
        }
      }

      searchFrom = idx + label.length;
    }
  }

  return null;
};

// Extract from form's dob (YYYY-MM-DD usually)
const extractDOBFromForm = (formDob) => {
  if (!formDob) return null;
  const d = new Date(formDob);
  if (isNaN(d.getTime())) return null;

  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const age = computeAge(day, month, year);
  if (age === null) return null;

  return { day, month, year, age, source: "form" };
};

export const verifyDocumentAzure = async (
  filePath,
  proofOfAgeType,
  formDob = null,
) => {
  try {
    const aiClient = getAIClient();
    const deploymentName = getDeploymentName();

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error("File not found for verification");
    }

    // Read file as base64
    const fileBuffer = fs.readFileSync(filePath);
    const base64Image = fileBuffer.toString("base64");
    const ext = path.extname(filePath).toLowerCase();
    let mimeType = "image/jpeg";
    if (ext === ".png") mimeType = "image/png";
    if (ext === ".pdf") mimeType = "application/pdf"; // Note: Azure OpenAI vision supports images (jpeg, png, gif, webp). PDFs usually require conversion or Document Intelligence. For now we assume image uploads are enforced or supported.

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `The user claims this is a: ${proofOfAgeType}. User's declared DOB (from form): ${formDob || "not provided"}. Please verify.`,
          },
          {
            type: "image_url",
            image_url: { url: `data:${mimeType};base64,${base64Image}` },
          },
        ],
      },
    ];

    const response = await aiClient.chat.completions.create({
      model: deploymentName,
      messages: messages,
      max_tokens: 300,
      temperature: 0.1,
    });

    if (!response.choices || response.choices.length === 0) {
      throw new Error("Empty AI response");
    }

    const aiOutput = response.choices[0].message.content.trim();
    let result;
    try {
      result = JSON.parse(aiOutput);
    } catch (parseError) {
      console.error("Failed to parse AI output:", aiOutput);
      throw new Error("Invalid response format from AI");
    }

    // Calculate file hash
    const hashSum = crypto.createHash("sha256");
    hashSum.update(fileBuffer);
    const fileHash = hashSum.digest("hex");

    // Generate a verification token if verified
    let token = null;
    if (result.verified) {
      // Sign a token that expires in 1 hour
      token = jwt.sign(
        {
          verified: true,
          proofOfAgeType,
          fileHash,
          timestamp: Date.now(),
        },
        process.env.JWT_SECRET || "marathon-secret-key",
        { expiresIn: "1h" },
      );
    }

    return {
      verified: result.verified,
      reason: result.reason,
      token,
    };
  } catch (error) {
    console.error("Document Verification Error:", error.message);
    throw error;
  } finally {
    // Always delete the temporary file after verification
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (unlinkErr) {
        console.error("Failed to delete temporary file:", unlinkErr.message);
      }
    }
  }
};

export const verifyDocument = async (
  filePath,
  proofOfAgeType,
  formDob = null,
) => {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error("File not found for verification");
    }

    const fileBuffer = fs.readFileSync(filePath);
    const base64Image = fileBuffer.toString("base64");
    const ext = path.extname(filePath).toLowerCase();
    let mimeType = "image/jpeg";
    if (ext === ".png") mimeType = "image/png";
    if (ext === ".pdf") mimeType = "application/pdf";

    // const apiKey = process.env.OCR_SPACE_API_KEY;

    // // Prepare FormData for OCR.space
    // const formData = new FormData();
    // formData.append('apikey', apiKey);
    // formData.append('language', 'eng');
    // formData.append('isOverlayRequired', 'false');

    // // Append the file buffer directly. Form-data package will handle it correctly.
    // formData.append('file', fileBuffer, {
    //     filename: path.basename(filePath),
    //     contentType: mimeType,
    // });

    // // OCREngine 2 has a 1MB limit for the free tier which causes 413 errors for typical smartphone photos.
    // // OCREngine 1 has a 5MB limit for the free tier.
    // formData.append('OCREngine', '1');

    // const response = await axios.post('https://api.ocr.space/parse/image', formData, {
    //     headers: {
    //         ...formData.getHeaders()
    //     },
    //     maxBodyLength: Infinity,
    //     maxContentLength: Infinity
    // });

    // const data = response.data;

    // if (data.IsErroredOnProcessing) {
    //     throw new Error(data.ErrorMessage ? data.ErrorMessage.join(', ') : "OCR processing failed");
    // }

    // const parsedText = data.ParsedResults?.[0]?.ParsedText?.toUpperCase() || "";
    // console.log("Extracted OCR Text:", parsedText);

    // ============================================================
    // NVIDIA Nemotron OCR v2
    // ============================================================

    const nvidiaApiKey = process.env.NVIDIA_API_KEY;

    if (!nvidiaApiKey) {
      throw new Error("NVIDIA_API_KEY is not configured");
    }

    // NVIDIA OCR currently accepts PNG/JPEG images.
    // PDF is not sent directly to the OCR image endpoint.
    if (!["image/jpeg", "image/png"].includes(mimeType)) {
      throw new Error(
        "Unsupported document format for NVIDIA OCR. Please upload JPG, JPEG or PNG.",
      );
    }

    const nvidiaResponse = await axios.post(
      "https://ai.api.nvidia.com/v1/cv/nvidia/nemotron-ocr-v2",
      {
        input: [
          {
            type: "image_url",
            url: `data:${mimeType};base64,${base64Image}`,
          },
        ],
        merge_levels: ["paragraph"],
      },
      {
        headers: {
          Authorization: `Bearer ${nvidiaApiKey}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        timeout: 120000,
      },
    );

    const nvidiaData = nvidiaResponse.data;

    // Extract text from NVIDIA OCR response
    const textDetections = nvidiaData?.data?.[0]?.text_detections || [];

    const parsedText = textDetections
      .map((item) => item?.text_prediction?.text || "")
      .filter(Boolean)
      .join("\n")
      .toUpperCase()
      .trim();

    console.log("Extracted NVIDIA OCR Text:", parsedText);

    if (!parsedText) {
      console.log("NVIDIA OCR Response:", JSON.stringify(nvidiaData));
    }

    let isVerified = false;
    let reason = "Validation failed: Uploaded document could not be verified.";

    /* ─────────────────────────────────────────────
     * AGE CHECK — Hybrid strategy
     *  1. Try to extract DOB from document (label based)
     *  2. If found → cross-check with form DOB (±1 yr tolerance)
     *  3. If NOT found → trust form DOB (India case: marksheets often lack DOB)
     * ───────────────────────────────────────────── */
    const docDob = extractDOBFromLabel(parsedText);
    const formDobParsed = extractDOBFromForm(formDob);

    let is18Plus = false;
    let dobSource = "none";
    let dobMismatch = false;

    if (docDob) {
      console.log(
        `DEBUG: DOB from document (${docDob.source}): ${docDob.day}/${docDob.month}/${docDob.year} → age ${docDob.age}`,
      );

      // Cross-check with form DOB if provided
      if (formDobParsed) {
        const yearDiff = Math.abs(docDob.year - formDobParsed.year);
        if (yearDiff > 1) {
          dobMismatch = true;
          console.log(
            `DEBUG: DOB mismatch → doc: ${docDob.year}, form: ${formDobParsed.year}`,
          );
        }
      }

      if (!dobMismatch && docDob.age >= 18 && docDob.age <= 100) {
        is18Plus = true;
        dobSource = "document";
      }
    } else {
      console.log(
        `DEBUG: DOB not found in document (common in Indian marksheets)`,
      );
    }

    // Fallback: document me DOB nahi mili → form DOB trust karo
    if (!is18Plus && !dobMismatch && formDobParsed) {
      console.log(`DEBUG: Using form DOB → age ${formDobParsed.age}`);
      if (formDobParsed.age >= 18 && formDobParsed.age <= 100) {
        is18Plus = true;
        dobSource = "form";
      }
    }

    console.log(
      `DEBUG: Final is18Plus=${is18Plus} (source: ${dobSource}, mismatch: ${dobMismatch})`,
    );

    if (!parsedText) {
      reason =
        "Document saaf nahi hai ya readable nahi hai. Kripya ek clear photo upload karein.";
    } else if (dobMismatch) {
      reason =
        "Document me likhi जन्मतिथि और फॉर्म की जन्मतिथि मेल नहीं खा रही। कृपया सही दस्तावेज अपलोड करें।";
    } else {
      const upperProofType = proofOfAgeType.toUpperCase();
      console.log("DEBUG proofOfAgeType:", proofOfAgeType);
      console.log("DEBUG is18Plus:", is18Plus);
      if (upperProofType.includes("PAN")) {
        // Check for PAN Regex (5 letters, 4 numbers, 1 letter)
        const panRegex = /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/;
        const hasPanFormat = panRegex.test(parsedText);

        // Specific PAN Card keywords
        const hasKeywords =
          parsedText.includes("INCOME TAX") ||
          parsedText.includes("INCOMETAX") ||
          parsedText.includes("GOVT OF INDIA");

        // For a valid PAN, it should ideally have the PAN number format.
        if (hasPanFormat && hasKeywords) {
          if (is18Plus) {
            isVerified = true;
            reason =
              "PAN Card verified successfully aur age 18+ confirm ho gayi hai.";
          } else {
            reason =
              "Document valid hai, par aapki age 18+ nahi hai (ya DOB clear nahi hai). Sirf 18+ log hi eligible hain.";
          }
        } else {
          reason =
            "Invalid PAN Card! Kripya asli aur clear PAN Card ki photo upload karein (Jisme PAN number clear dikh raha ho).";
        }
      } else if (upperProofType.includes("10TH")) {
        const isMarksheet = [
          "BOARD",
          "EXAMINATION",
          "CERTIFICATE",
          "MARKS",
          "SCHOOL",
          "EDUCATION",
          "SECONDARY",
        ].some((kw) => parsedText.includes(kw));

        // Strict Regex for 10th: 10TH, X, HIGH SCHOOL, SECONDARY (but ensure it doesn't just pass Senior Secondary)
        const is10thRegex = /\b10TH\b|\bX\b|HIGH SCHOOL|\bSECONDARY\b/;
        const isNot12thRegex =
          /HIGHER SECONDARY|SENIOR SECONDARY|INTERMEDIATE|\b12TH\b|\bXII\b/;

        const is10th =
          is10thRegex.test(parsedText) && !isNot12thRegex.test(parsedText);

        if (isMarksheet && is10th) {
          if (is18Plus) {
            isVerified = true;
            reason =
              "10th Marksheet verified successfully aur age 18+ confirm ho gayi hai.";
          } else {
            reason =
              "Document valid hai, par aapki age 18+ nahi hai (ya DOB clear nahi hai). Sirf 18+ log hi eligible hain.";
          }
        } else {
          reason =
            "Invalid Document! Ye 10th ki marksheet nahi lag rahi. Kripya sahi 10th Marksheet upload karein.";
        }
      } else if (upperProofType.includes("12TH")) {
        const isMarksheet = [
          "BOARD",
          "EXAMINATION",
          "CERTIFICATE",
          "MARKS",
          "SCHOOL",
          "EDUCATION",
        ].some((kw) => parsedText.includes(kw));

        // Strict Regex for 12th: 12TH, XII, INTERMEDIATE, HIGHER SECONDARY, SENIOR SECONDARY
        const is12thRegex =
          /\b12TH\b|\bXII\b|INTERMEDIATE|HIGHER SECONDARY|SENIOR SECONDARY/;
        const is12th = is12thRegex.test(parsedText);
        console.log("DEBUG is12th:", is12th);
        console.log("DEBUG isMarksheet:", isMarksheet);
        if (isMarksheet && is12th) {
          if (is18Plus) {
            isVerified = true;
            reason =
              "12th Marksheet verified successfully aur age 18+ confirm ho gayi hai.";
          } else {
            reason =
              "Document valid hai, par aapki age 18+ nahi hai (ya DOB clear nahi hai). Sirf 18+ log hi eligible hain.";
          }
        } else {
          reason =
            "Invalid Document! Ye 12th ki marksheet nahi lag rahi. Kripya sahi 12th Marksheet upload karein.";
        }
      } else {
        isVerified = true;
        reason = "Document extracted and verified successfully.";
      }
    }

    // Calculate file hash
    const hashSum = crypto.createHash("sha256");
    hashSum.update(fileBuffer);
    const fileHash = hashSum.digest("hex");

    // Generate a verification token if verified
    let token = null;
    if (isVerified) {
      token = jwt.sign(
        {
          verified: true,
          proofOfAgeType,
          fileHash,
          timestamp: Date.now(),
        },
        process.env.JWT_SECRET || "marathon-secret-key",
        { expiresIn: "1h" },
      );
    }

    return {
      verified: isVerified,
      reason: reason,
      token,
    };
  } catch (error) {
    // console.error("OCR.space Verification Error:", error.message);
    console.error("NVIDIA OCR Verification Error:", error.message);

    if (axios.isAxiosError(error) && error.response) {
      if (
        error.response.status === 413 ||
        error.response.data?.error?.includes("too large")
      ) {
        return {
          verified: false,
          reason:
            "File bahut badi hai (Max 1.5 MB allowed). Kripya chhote size ki image upload karein.",
          token: null,
        };
      }
      return {
        verified: false,
        reason: `OCR Error: ${error.response.data?.ErrorMessage || error.response.data?.error || "Verification failed"}`,
        token: null,
      };
    }

    throw error;
  } finally {
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (unlinkErr) {
        console.error("Failed to delete temporary file:", unlinkErr.message);
      }
    }
  }
};
