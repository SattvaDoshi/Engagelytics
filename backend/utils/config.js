import dotenv from 'dotenv';
dotenv.config();

if (!process.env.LANGFLOW_TOKEN) {
    throw new Error('LANGFLOW_TOKEN is not defined in environment variables');
}

export const config = {
    flowIdOrName: 'c8e26aca-f070-4cef-b0bb-87346250c8ea',
    langflowId: '8231c06a-3f25-4803-af8c-5e02695e8843',
    applicationToken: process.env.LANGFLOW_TOKEN,
    baseURL: 'https://api.langflow.astra.datastax.com',
    tweaks: {
        "AstraDBToolComponent-LRArI": {},
        "ParseData-AIblJ": {},
        "CombineText-dDLVs": {},
        "Prompt-t8ix0": {},
        "ChatOutput-0qDHE": {},
        "GroqModel-4EVY6": {},
        "ChatInput-kZ0Yh": {}
    }
};