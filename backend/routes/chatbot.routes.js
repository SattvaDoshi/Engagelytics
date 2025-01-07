import express from 'express';

const router = express.Router();

// Chat route
router.post('/chat', async (req, res) => {
    const { message, stream } = req.body;
    const { langflow, flowId, langflowId } = req;

    try {
        const response = await langflow.runFlow(
            flowId,
            langflowId,
            message,
            'chat',
            'chat',
            {},
            stream,
            (data) => console.log("Received:", data.chunk), // Stream updates
            (message) => console.log("Stream Closed:", message), // Stream close
            (error) => console.log("Stream Error:", error) // Stream error
        );

        if (!stream) {
            const output = response?.outputs?.[0]?.outputs?.[0]?.outputs?.message?.message?.text;
            res.json({ success: true, message: output });
        }
    } catch (error) {
        console.error('Error processing chat:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
