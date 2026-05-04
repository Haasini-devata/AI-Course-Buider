import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const generateCourseContent = async (topic) => {
  try {
    console.log("Calling Groq...");

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant", 
        messages: [
          {
            role: "user",
            content: `Create a structured course on ${topic}.

Return ONLY valid JSON. Do not include any explanation.

Format:
{
  "title": "Course Title",
  "description": "Short description",
  "lessons": [
    { "title": "Lesson 1", "content": "Explanation" },
    { "title": "Lesson 2", "content": "Explanation" },
    { "title": "Lesson 3", "content": "Explanation" },
    { "title": "Lesson 4", "content": "Explanation" },
    { "title": "Lesson 5", "content": "Explanation" }
  ]
}`
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const text = response.data.choices[0].message.content;

    console.log("📥 RAW AI RESPONSE:\n", text);

    let cleaned = text.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.log(" JSON parse failed, using fallback");

      parsed = {
        title: topic,
        description: "Generated course",
        lessons: [
          {
            title: "Introduction",
            content: cleaned
          }
        ]
      };
    }

    return parsed;

  } catch (error) {
    console.error(" GROQ ERROR:", error.response?.data || error.message);

    return {
      title: topic,
      description: "API failed",
      lessons: [
        {
          title: "Intro",
          content: "Unable to generate course. Try again."
        }
      ]
    };
  }
};