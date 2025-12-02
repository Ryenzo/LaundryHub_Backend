import express from 'express';
import { sendMessage, clearSession } from '../controllers/chatbotController.js';

const router = express.Router();

/**
 * @route   POST /api/chatbot/message
 * @desc    Send a message to the chatbot and get AI response
 * @access  Public
 */
router.post('/message', sendMessage);

/**
 * @route   DELETE /api/chatbot/session/:sessionId
 * @desc    Clear a chat session
 * @access  Public
 */
router.delete('/session/:sessionId', clearSession);

export default router;
