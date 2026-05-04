import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import courseRoutes from "./routes/courseRoutes.js";
import { connectDB } from "./config/db.js";
connectDB();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://ai-course-builder-u7y2.vercel.app","https://ai-course-buider.vercel.app/"],
  methods: ["GET", "POST","OPTIONS"],
  credentials: true
}));
app.use(express.json());

app.use("/api", courseRoutes); 
app.get("/api/test", (req, res) => {
  res.send("API working");
});
app.get("/", (req, res) => res.send("🚀 Server is alive and listening!"));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`\n SERVER RUNNING ON PORT: ${PORT}`);
  console.log(`Confirm by visiting: http://localhost:${PORT}/\n`);
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");
  })
  .catch(err => {
    console.error(" MongoDB Connection Error:", err.message);
    console.log("Note: AI will still work if Ollama is running locally.");
  });


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong on the server" });
});

