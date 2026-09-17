import fs from 'fs';
import path from 'path';
import { getAIClient, getDeploymentName } from '../../../config/azureOpenAI.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import axios from 'axios';
import FormData from 'form-data';

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

export const verifyDocumentAzure = async (filePath, proofOfAgeType) => {
    try {
        const aiClient = getAIClient();
        const deploymentName = getDeploymentName();

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            throw new Error("File not found for verification");
        }

        // Read file as base64
        const fileBuffer = fs.readFileSync(filePath);
        const base64Image = fileBuffer.toString('base64');
        const ext = path.extname(filePath).toLowerCase();
        let mimeType = 'image/jpeg';
        if (ext === '.png') mimeType = 'image/png';
        if (ext === '.pdf') mimeType = 'application/pdf'; // Note: Azure OpenAI vision supports images (jpeg, png, gif, webp). PDFs usually require conversion or Document Intelligence. For now we assume image uploads are enforced or supported.

        const messages = [
            { role: "system", content: SYSTEM_PROMPT },
            { 
                role: "user", 
                content: [
                    { type: "text", text: `The user claims this is a: ${proofOfAgeType}. Please verify.` },
                    { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64Image}` } }
                ]
            }
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
        const hashSum = crypto.createHash('sha256');
        hashSum.update(fileBuffer);
        const fileHash = hashSum.digest('hex');

        // Generate a verification token if verified
        let token = null;
        if (result.verified) {
            // Sign a token that expires in 1 hour
            token = jwt.sign(
                { 
                    verified: true, 
                    proofOfAgeType,
                    fileHash,
                    timestamp: Date.now() 
                }, 
                process.env.JWT_SECRET || 'marathon-secret-key', 
                { expiresIn: '1h' }
            );
        }

        return {
            verified: result.verified,
            reason: result.reason,
            token
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

export const verifyDocument = async (filePath, proofOfAgeType) => {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error("File not found for verification");
        }

        const fileBuffer = fs.readFileSync(filePath);
        const base64Image = fileBuffer.toString('base64');
        const ext = path.extname(filePath).toLowerCase();
        let mimeType = 'image/jpeg';
        if (ext === '.png') mimeType = 'image/png';
        if (ext === '.pdf') mimeType = 'application/pdf';

        const apiKey = 'K84734011188957';
        
        // Prepare FormData for OCR.space
        const formData = new FormData();
        formData.append('apikey', apiKey);
        formData.append('language', 'eng');
        formData.append('isOverlayRequired', 'false');
        
        // Append the file buffer directly. Form-data package will handle it correctly.
        formData.append('file', fileBuffer, {
            filename: path.basename(filePath),
            contentType: mimeType,
        });
        
        // OCREngine 2 has a 1MB limit for the free tier which causes 413 errors for typical smartphone photos.
        // OCREngine 1 has a 5MB limit for the free tier.
        formData.append('OCREngine', '1'); 

        const response = await axios.post('https://api.ocr.space/parse/image', formData, {
            headers: {
                ...formData.getHeaders()
            },
            maxBodyLength: Infinity,
            maxContentLength: Infinity
        });

        const data = response.data;
        
        if (data.IsErroredOnProcessing) {
            throw new Error(data.ErrorMessage ? data.ErrorMessage.join(', ') : "OCR processing failed");
        }

        const parsedText = data.ParsedResults?.[0]?.ParsedText?.toUpperCase() || "";
        console.log("Extracted OCR Text:", parsedText);

        let isVerified = false;
        let reason = "Validation failed: Uploaded document could not be verified.";

        // Helper to check if any extracted date is 18+ years old
        const check18Plus = (text) => {
            const dateRegex1 = /\b(\d{2})[-/.](\d{2})[-/.](\d{4})\b/g; // DD/MM/YYYY
            const dateRegex2 = /\b(\d{4})[-/.](\d{2})[-/.](\d{2})\b/g; // YYYY/MM/DD
            const dates = [];
            let match;
            
            while ((match = dateRegex1.exec(text)) !== null) {
                dates.push({ day: parseInt(match[1]), month: parseInt(match[2]), year: parseInt(match[3]) });
            }
            while ((match = dateRegex2.exec(text)) !== null) {
                dates.push({ day: parseInt(match[3]), month: parseInt(match[2]), year: parseInt(match[1]) });
            }

            const today = new Date();
            for (const d of dates) {
                if (d.month >= 1 && d.month <= 12 && d.day >= 1 && d.day <= 31) {
                    let age = today.getFullYear() - d.year;
                    if (today.getMonth() + 1 < d.month || (today.getMonth() + 1 === d.month && today.getDate() < d.day)) {
                        age--;
                    }
                    if (age >= 18 && age <= 100) return true;
                }
            }
            return false;
        };

        if (!parsedText) {
            reason = "Document saaf nahi hai ya readable nahi hai. Kripya ek clear photo upload karein.";
        } else {
            const upperProofType = proofOfAgeType.toUpperCase();
            const is18Plus = check18Plus(parsedText);
            
            if (upperProofType.includes('PAN')) {
                // Check for PAN Regex (5 letters, 4 numbers, 1 letter)
                const panRegex = /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/;
                const hasPanFormat = panRegex.test(parsedText);
                
                // Specific PAN Card keywords
                const hasKeywords = parsedText.includes('INCOME TAX') || parsedText.includes('INCOMETAX') || parsedText.includes('GOVT OF INDIA');
                
                // For a valid PAN, it should ideally have the PAN number format.
                if (hasPanFormat && hasKeywords) {
                    if (is18Plus) {
                        isVerified = true;
                        reason = "PAN Card verified successfully aur age 18+ confirm ho gayi hai.";
                    } else {
                        reason = "Document valid hai, par aapki age 18+ nahi hai (ya DOB clear nahi hai). Sirf 18+ log hi eligible hain.";
                    }
                } else {
                    reason = "Invalid PAN Card! Kripya asli aur clear PAN Card ki photo upload karein (Jisme PAN number clear dikh raha ho).";
                }
            } else if (upperProofType.includes('10TH')) {
                const isMarksheet = ['BOARD', 'EXAMINATION', 'CERTIFICATE', 'MARKS', 'SCHOOL', 'EDUCATION', 'SECONDARY'].some(kw => parsedText.includes(kw));
                
                // Strict Regex for 10th: 10TH, X, HIGH SCHOOL, SECONDARY (but ensure it doesn't just pass Senior Secondary)
                const is10thRegex = /\b10TH\b|\bX\b|HIGH SCHOOL|\bSECONDARY\b/;
                const isNot12thRegex = /HIGHER SECONDARY|SENIOR SECONDARY|INTERMEDIATE|\b12TH\b|\bXII\b/;
                
                const is10th = is10thRegex.test(parsedText) && !isNot12thRegex.test(parsedText);
                
                if (isMarksheet && is10th) {
                    if (is18Plus) {
                        isVerified = true;
                        reason = "10th Marksheet verified successfully aur age 18+ confirm ho gayi hai.";
                    } else {
                        reason = "Document valid hai, par aapki age 18+ nahi hai (ya DOB clear nahi hai). Sirf 18+ log hi eligible hain.";
                    }
                } else {
                    reason = "Invalid Document! Ye 10th ki marksheet nahi lag rahi. Kripya sahi 10th Marksheet upload karein.";
                }
            } else if (upperProofType.includes('12TH')) {
                const isMarksheet = ['BOARD', 'EXAMINATION', 'CERTIFICATE', 'MARKS', 'SCHOOL', 'EDUCATION'].some(kw => parsedText.includes(kw));
                
                // Strict Regex for 12th: 12TH, XII, INTERMEDIATE, HIGHER SECONDARY, SENIOR SECONDARY
                const is12thRegex = /\b12TH\b|\bXII\b|INTERMEDIATE|HIGHER SECONDARY|SENIOR SECONDARY/;
                const is12th = is12thRegex.test(parsedText);
                
                if (isMarksheet && is12th) {
                    if (is18Plus) {
                        isVerified = true;
                        reason = "12th Marksheet verified successfully aur age 18+ confirm ho gayi hai.";
                    } else {
                        reason = "Document valid hai, par aapki age 18+ nahi hai (ya DOB clear nahi hai). Sirf 18+ log hi eligible hain.";
                    }
                } else {
                    reason = "Invalid Document! Ye 12th ki marksheet nahi lag rahi. Kripya sahi 12th Marksheet upload karein.";
                }
            } else {  isVerified = true;
                reason = "Document extracted and verified successfully.";
            }
        }

        // Calculate file hash
        const hashSum = crypto.createHash('sha256');
        hashSum.update(fileBuffer);
        const fileHash = hashSum.digest('hex');

        // Generate a verification token if verified
        let token = null;
        if (isVerified) {
            token = jwt.sign(
                { 
                    verified: true, 
                    proofOfAgeType,
                    fileHash,
                    timestamp: Date.now() 
                }, 
                process.env.JWT_SECRET || 'marathon-secret-key', 
                { expiresIn: '1h' }
            );
        }

        return {
            verified: isVerified,
            reason: reason,
            token
        };

    } catch (error) {
        console.error("OCR.space Verification Error:", error.message);
        
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 413 || error.response.data?.error?.includes('too large')) {
                return {
                    verified: false,
                    reason: "File bahut badi hai (Max 1.5 MB allowed). Kripya chhote size ki image upload karein.",
                    token: null
                };
            }
            return {
                verified: false,
                reason: `OCR Error: ${error.response.data?.ErrorMessage || error.response.data?.error || "Verification failed"}`,
                token: null
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
