import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  youtubeId: { type: String }
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topic: { type: String, required: true }, 
  description: { type: String },
  lessons: [lessonSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Course", courseSchema);