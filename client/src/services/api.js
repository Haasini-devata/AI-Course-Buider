import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});
export const generateCourse = (topic) => API.post("/generate", { topic });

