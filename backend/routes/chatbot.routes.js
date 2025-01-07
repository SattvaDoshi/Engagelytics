import express from 'express';
import LangflowClient from '../utils/langflow.js';
import { config } from '../utils/config.js';

const router = express.Router();

// Initialize Langflow client
const langflowClient = new LangflowClient(config.baseURL, config.applicationToken);

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

// Chat endpoint
router.post('/chat', async (req, res) => {
    try {
        const { 
            message, 
            inputType = 'chat', 
            outputType = 'chat', 
            stream = false 
        } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const response = await langflowClient.runFlow(
            config.flowIdOrName,
            config.langflowId,
            message,
            inputType,
            outputType,
            config.tweaks,
            stream
        );

        res.json({ response });
    } catch (error) {
        console.error('Chat Error:', error);
        res.status(500).json({ 
            error: 'Failed to process chat request',
            details: error.message 
        });
    }
});

export default router;