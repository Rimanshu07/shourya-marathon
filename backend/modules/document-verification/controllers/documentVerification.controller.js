import { verifyDocument } from '../services/documentVerification.service.js';

export const verifyDocumentUpload = async (req, res) => {
    try {
        const { proofOfAgeType } = req.body;
        
        if (!proofOfAgeType) {
            return res.status(400).json({ success: false, message: 'proofOfAgeType is required' });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No document uploaded' });
        }

        const filePath = req.file.path;
        
        const result = await verifyDocument(filePath, proofOfAgeType);
        
        if (result.verified) {
            return res.status(200).json({
                success: true,
                verified: true,
                message: result.reason,
                token: result.token
            });
        } else {
            return res.status(400).json({
                success: false,
                verified: false,
                message: result.reason
            });
        }

    } catch (error) {
        console.error('Verify Document Error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error during verification' });
    }
};
