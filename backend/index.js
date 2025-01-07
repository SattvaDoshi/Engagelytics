import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { LangflowClient } from './langflow.js';
import chatbotRoutes from './routes/chatbot.routes.js';

// Load environment variables
dotenv.config();

// Langflow configuration from .env
const { BASE_URL, APPLICATION_TOKEN, FLOW_ID, LANGFLOW_ID, PORT } = process.env;

// Initialize Langflow Client
const langflowClient = new LangflowClient(BASE_URL, APPLICATION_TOKEN);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Inject Langflow Client and configuration into request object
app.use((req, res, next) => {
    req.langflow = langflowClient;
    req.flowId = FLOW_ID;
    req.langflowId = LANGFLOW_ID;
    next();
});

// Routes
app.use('/api', chatbotRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
