import express from "express";
import { createCourse } from "../controllers/testController.js";

const router = express.Router();
router.get("/test", (req, res) => {
  res.send("API working");
});

// Existing route
router.post("/generate", createCourse);

export default router;