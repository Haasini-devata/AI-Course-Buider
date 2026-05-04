import { generateCourseContent } from "../utils/aiService.js";
import { getYouTubeVideo } from "../utils/youtubeService.js";
import Course from "../models/course.js";

export const createCourse = async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    console.log(" Request received:", topic);

    let courseData;
    try {
      courseData = await generateCourseContent(topic);
    } catch (err) {
      console.error("AI Error:", err.message);
      return res.status(500).json({
        error: "AI generation failed",
        details: err.message
      });
    }

    if (!courseData || !courseData.lessons) {
      return res.status(500).json({
        error: "Invalid AI response format"
      });
    }

    console.log("AI Response received");

    const lessonsWithVideos = await Promise.all(
      courseData.lessons.map(async (lesson) => {
        try {
          const videoId = await getYouTubeVideo(`${topic} ${lesson.title}`);
          return { ...lesson, youtubeId: videoId || null };
        } catch (err) {
          console.error("YouTube Error:", err.message);
          return { ...lesson, youtubeId: null };
        }
      })
    );

    const finalCourseData = {
      title: courseData.title || topic,
      description: courseData.description || "",
      lessons: lessonsWithVideos,
      topic
    };

    try {
      const newCourse = new Course(finalCourseData);
      await newCourse.save();
      console.log("Saved to DB");
    } catch (err) {
      console.error(" DB Save Failed:", err.message);
      // Continue even if DB fails
    }

    console.log(" Sending response...");
    return res.status(200).json(finalCourseData);

  } catch (error) {
    console.error(" Controller Crash:", error);
    return res.status(500).json({
      error: "Server crashed",
      details: error.message
    });
  }
};