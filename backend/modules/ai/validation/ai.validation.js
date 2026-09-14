export const validateChatRequest = (req, res, next) => {
    const { message } = req.body;

    if (message === undefined || message === null) {
        return res.status(400).json({ success: false, message: "Message is required." });
    }

    if (typeof message !== 'string') {
        return res.status(400).json({ success: false, message: "Message must be a string." });
    }

    const trimmedMessage = message.trim();

    if (trimmedMessage.length === 0) {
        return res.status(400).json({ success: false, message: "Message cannot be empty." });
    }

    if (trimmedMessage.length > 500) {
        return res.status(400).json({ success: false, message: "Message is too long. Maximum 500 characters allowed." });
    }

    req.body.message = trimmedMessage;
    next();
};
