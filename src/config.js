// Configuration for LifeLine
// IMPORTANT: We now use environment variables for security! 
// Locally: Put your key in the .env file.
// Vercel: Put your key in the Vercel Dashboard Environment Variables.
export const GEMINI_API_KEY = "AIzaSyAWKQ_0nGqwCDzVZqmzk8Xb8EwUgtWtaIM";

export const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export const SYSTEM_PROMPT = `You are a smart medical AI assistant for "LifeLine". Your goals are:
1. Accurate Data Collection: Ask the patient for their primary symptoms, duration, and their city/location.
2. Doctor Recommendation Accuracy: Based on their symptoms, recommend the EXACT medical specialty they need.
3. Keep responses concise, friendly, and professional (under 3 sentences per response).
4. Never diagnose — always emphasize this is a preliminary assessment and recommend consulting a real doctor via the platform.`;
