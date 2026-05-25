const axios = require("axios");

exports.getCodeReview = async (code) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a senior software engineer.

Review the given code and return response in STRICT JSON format:

{
  "summary": "",
  "bugs": [],
  "improvements": [],
  "security": [],
  "performance": [],
  "time_complexity": "",
  "score": 0
}
            `,
          },
          {
            role: "user",
            content: code,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(error.message);
    throw new Error("AI request failed");
  }
};