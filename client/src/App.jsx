import React, { useState } from 'react';
import SearchBar from './components/searchBar.jsx';
import { generateCourse } from './services/api';

function App() {
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState(null);

  const handleSearch = async (topic) => {
  setLoading(true);
  setCourse(null);

  try {
    console.log(" Sending request...");

    const response = await generateCourse(topic);

    console.log(" FULL RESPONSE:", response);
    console.log(" RESPONSE DATA:", response.data);
    console.log(" COURSE STATE:", course);

  const courseData = response.data;

    console.log(" FINAL COURSE:", courseData);

    setCourse(courseData);

  } catch (error) {
    console.error(" API ERROR:", error);
    console.error(" ERROR RESPONSE:", error.response);

    alert("API failed - check console");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-white border-b p-4 shadow-sm text-center">
        <h1 className="text-2xl font-bold text-indigo-600">EduStream AI</h1>
      </nav>

      <main className="max-w-4xl mx-auto p-6">
        <div className="mt-10 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">AI Course Generator</h2>
          <p className="text-slate-500 mb-8">Enter any technical topic to generate a roadmap.</p>
          
          <SearchBar onSearch={handleSearch} loading={loading} />
          
          {loading && (
            <div className="mt-8 flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-2"></div>
              <p className="text-indigo-600 font-medium">Ollama is generating your syllabus...</p>
            </div>
          )}
        </div>

        {/* PRO DISPLAY: Showing the Course Content */}
        {course && (
          <div className="mt-12 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-indigo-600 p-6 text-white">
              <h2 className="text-2xl font-bold">{course.title}</h2>
              <p className="opacity-90">Custom generated learning path</p>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Course Modules:</h3>
              <div className="space-y-4">
              {course.lessons?.map((lesson, i) => (
  <div key={i} className="flex items-start p-4 bg-slate-50 rounded-lg border border-slate-100">
    <span className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-md mr-4">
      {i + 1}
    </span>
    <div>
      <h4 className="font-bold text-slate-800">{lesson.title}</h4>
      <p className="text-sm text-slate-500">{lesson.content}</p>
      {lesson.youtubeId && (
  <iframe
    width="100%"
    height="315"
    src={`https://www.youtube.com/embed/${lesson.youtubeId}`}
    title="YouTube video"
    frameBorder="0"
    allowFullScreen
    className="mt-4 rounded-lg"
  ></iframe>
)}
    </div>
  </div>
))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;