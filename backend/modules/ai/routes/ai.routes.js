import express from 'express';
import { handleChat } from '../controllers/ai.controller.js';
import { validateChatRequest } from '../validation/ai.validation.js';

const router = express.Router();

router.post('/chat', validateChatRequest, handleChat);

export default router;
