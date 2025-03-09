import { Router } from "express";
import OpenAI from "openai";
import express from "express";
import { systemPrompt } from "../prompts/systemprompt";

export const chatBot = Router();

chatBot.use(express.json())

chatBot.post("/chat", async (req, res) => {
    const { prompt } = req.body;

    const openai = new OpenAI({
        apiKey: Bun.env.GEMINI_API_KEY,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
    });
    const response = await openai.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt },
        ],
    });
    //console.log(response.choices[0].message.content);
    res.json({
        response: response.choices[0].message.content
    });
})

