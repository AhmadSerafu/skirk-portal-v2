const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const genAi = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });
  return response.text;
};

const genAiStructuredOutput = async (prompt) => {
  const response = await genAi(prompt);
  const json = response.replace("```json", "").replace("```", "").trim();
  return JSON.parse(json);
};

module.exports = { genAi, genAiStructuredOutput };
