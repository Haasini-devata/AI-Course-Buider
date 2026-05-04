AI Course Generator
An AI-powered MERN stack application that generates personalized technical learning roadmaps using Gemini AI and YouTube integration.

Features
AI-generated course structure
Dynamic lesson roadmap creation
YouTube video recommendations
MongoDB course storage
React frontend with Vite
Express + Node.js backend

Tech Stack
React.js
Node.js
Express.js
MongoDB
Groq AI API
YouTube Data API

System Architecture
User Input → React Frontend → Express API → Gemini AI → MongoDB → UI Rendering

  Installation

Client
npm install
npm run dev

Server
npm install
npm run dev

Environment Variables
Create `.env` inside server:

PORT=5000
MONGO_URI=your_mongodb_uri
Groq_API_KEY=your_key
YOUTUBE_API_KEY=your_key
