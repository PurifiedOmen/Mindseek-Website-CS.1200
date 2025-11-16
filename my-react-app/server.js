import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Gemini client with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Missing message." });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
    });

    // MindSeek system prompt
    const systemPrompt = `You are MindSeek, a supportive AI assistant for high school and college students. 
Focus ONLY on coping strategies, stress management, study tips, and mental wellness support. 
Keep responses under 200 words, empathetic, actionable, and encouraging.
If someone mentions crisis or self-harm, remind them to reach out to a trusted adult or call 988.`;

    const fullPrompt = `${systemPrompt}\n\nStudent: ${userMessage}\n\nMindSeek:`;

    const result = await model.generateContent(fullPrompt);
    const output = result.response.text();

    // Trim response to roughly 200 words
    const trimmedOutput = output.split(" ").slice(0, 200).join(" ");

    res.json({ response: trimmedOutput });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server couldn't process the request." });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));