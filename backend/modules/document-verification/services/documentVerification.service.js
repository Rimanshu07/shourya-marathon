import fs from 'fs';
import path from 'path';
import { getAIClient, getDeploymentName } from '../../../config/azureOpenAI.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const SYSTEM_PROMPT = `You are a strict document verification assistant.
Your job is to perform basic validity checks on uploaded documents for a marathon registration.
You will receive an image and the declared document type.
You must check:
1. Does the image generally look like the declared document type?
2. Is the text readable?
3. Are the basic format and fields (e.g., PAN format, Name, DOB/Age) visible and valid?

Do NOT claim "Government database confirms this is genuine". You cannot verify government-level authenticity, only document type, readability, and basic validity checks.

Respond strictly in valid JSON format:
{
  "verified": boolean,
  "reason": "string explaining the result (e.g., 'PAN card verified successfully' or 'Image is blurry and unreadable')"
}
Do not include any markdown formatting like \`\`\`json. Return only the JSON object.`;

export const verifyDocument = async (filePath, proofOfAgeType) => {
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
