import { chatWithAI } from '../services/ai.service.js';

export const handleChat = async (req, res) => {
    try {
        const { message } = req.body;

        const aiResponse = await chatWithAI({ message });

        res.status(200).json({
            success: true,
            data: {
                answer: aiResponse.answer
            }
        });
    } catch (error) {
        // Detailed log kept server-side (error.message is already logged in service)
        // User-facing simple error format matching existing patterns
        res.status(500).json({
            success: false,
            message: "AI service is temporarily unavailable. Please try again later."
        });
    }
};
