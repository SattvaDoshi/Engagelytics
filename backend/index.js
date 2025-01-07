import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/chatbot.routes.js';

dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(json());

// Apply routes
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/', routes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});