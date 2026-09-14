import { AzureOpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();

let aiClient = null;

export const getAIClient = () => {
    if (!aiClient) {
        if (!process.env.AZURE_OPENAI_ENDPOINT || !process.env.AZURE_OPENAI_API_KEY) {
            console.warn("Azure OpenAI is not fully configured in .env. AI Chat will fail gracefully.");
        }
        
        // In @azure/openai v2+, we instantiate AzureOpenAI from the 'openai' package
        aiClient = new AzureOpenAI({
            endpoint: process.env.AZURE_OPENAI_ENDPOINT,
            apiKey: process.env.AZURE_OPENAI_API_KEY,
            apiVersion: process.env.AZURE_OPENAI_API_VERSION,
            deployment: process.env.AZURE_OPENAI_DEPLOYMENT_NAME
        });
    }
    return aiClient;
};

export const getDeploymentName = () => {
    return process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "dummy-deployment";
};
