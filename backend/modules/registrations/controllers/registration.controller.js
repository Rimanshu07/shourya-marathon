import RegistrationModel from '../models/registration.model.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import crypto from 'crypto';

class RegistrationController {
    static async getAllRegistrations(req, res) {
        try {
            const registrations = await RegistrationModel.findAll();
            res.json({ success: true, data: registrations });
        } catch (error) {
            console.error('Error fetching registrations:', error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }

    static async register(req, res) {
        try {
            const data = req.body;
            
            // Basic validation
            if (!data.fullName || !data.email || !data.phone) {
                return res.status(400).json({ success: false, message: 'Missing required fields' });
            }

            // Document Verification Enforcement
            const verificationToken = req.body.verificationToken;
            if (!verificationToken) {
                return res.status(400).json({ success: false, message: 'Document verification token is required' });
            }
            try {
                const decoded = jwt.verify(verificationToken, process.env.JWT_SECRET || 'marathon-secret-key');
                if (!decoded.verified) {
                    throw new Error("Token invalid");
                }
                if (decoded.proofOfAgeType !== data.proofOfAgeType) {
                    throw new Error("Document type mismatch");
                }
                
                // File Hash Binding Check
                const finalProofOfAgeFile = req.files && req.files['proofOfAge'] ? req.files['proofOfAge'][0] : null;
                if (!finalProofOfAgeFile) {
                    throw new Error("Proof of age file is missing");
                }
                const fileBuffer = fs.readFileSync(finalProofOfAgeFile.path);
                const hashSum = crypto.createHash('sha256');
                hashSum.update(fileBuffer);
                const finalFileHash = hashSum.digest('hex');
                
                if (finalFileHash !== decoded.fileHash) {
                    throw new Error("File hash mismatch. The uploaded document does not match the verified document.");
                }

            } catch (err) {
                return res.status(400).json({ success: false, message: 'Invalid or expired document verification token. Please re-upload your document.' });
            }

            // Handle uploaded files if present
            const photoUrl = req.files && req.files['photo'] ? req.files['photo'][0].path : null;
            const proofOfAgeUrl = req.files && req.files['proofOfAge'] ? req.files['proofOfAge'][0].path : null;

            const registrationData = {
                name: data.fullName,
                father_name: data.fatherName,
                email: data.email,
                phone: data.phone,
                dob: data.dob,
                gender: data.gender,
                state: data.state,
                city: data.city,
                category: data.categoryId || '10k',
                photo_url: photoUrl,
                proof_of_age_url: proofOfAgeUrl
            };

            const registrationId = await RegistrationModel.create(registrationData);
            
            res.json({
                success: true,
                message: 'Registration created successfully',
                registrationId
            });

        } catch (error) {
            console.error('Registration Error:', error);
            res.status(500).json({ success: false, message: 'Server error during registration' });
        }
    }
}

export default RegistrationController;
