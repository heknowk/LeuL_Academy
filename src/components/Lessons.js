import React, { useState } from "react";

function Lessons({ grade, subject, setScreen, setLesson, lessons }) {
  const [search, setSearch] = useState("");
    const filteredLessons = lessons.filter((l) => {
    return (
      l.grade === grade &&
      l.subject === subject &&
      l.title.toLowerCase().includes(search.toLowerCase())
    );
  });
<input
  type="text"
  placeholder="🔍 Search lesson..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    padding: "10px",
    width: "80%",
    marginBottom: "20px",
    borderRadius: "8px",
  }}
/>

  return (
    <div className="screen">
      <h2>{subject} - Grade {grade}</h2>
                <ul>
            {lessonsForSubject.length > 0 ? (
                lessonsForSubject.map((lesson) => (
                <li key={lesson.id} className="lesson-card">
                    <button onClick={() => { setLesson(lesson); setScreen("lessonDetail"); }} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "0" }}>
                    <strong>{lesson.title}</strong><br/>
                    {lesson.video && "🎥"} {lesson.audio && "🎧"} {lesson.text && "📄"}
                    </button>
                </li>
                ))
            ) : (
                <p>No lessons uploaded yet for this subject.</p>
            )}
            </ul>
      <button onClick={() => setScreen("subjects")}>⬅ Back to Subjects</button>
    </div>
    
  );
  
}

export default Lessons;