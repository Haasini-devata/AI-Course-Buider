import axios from "axios";

// Flexible API URL for local + deployed environments
const API_BASE_URL =
import.meta.env.VITE_API_URL ||
"http://localhost:5000/api";

const API = axios.create({
baseURL: API_BASE_URL,
});

// GENERATE COURSE
export const generateCourse = (topic) => {
return API.post("/generate", { topic });
};
