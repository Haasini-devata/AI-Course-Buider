import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export const getYouTubeVideo = async (query) => {
  try {
    if (!YOUTUBE_API_KEY) {
      throw new Error("YouTube API key missing in .env");
    }

    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: `${query} tutorial`, 
          type: "video",
          videoEmbeddable: "true",
          videoCategoryId: "27", 
          maxResults: 1,
          key: YOUTUBE_API_KEY,
        },
      }
    );

    const video = response.data?.items?.[0];

    if (!video) return null;

    
    return video.id.videoId;

  } catch (error) {
    console.error(
      "YouTube API Error:",
      error.response?.data || error.message
    );
    return null;
  }
};