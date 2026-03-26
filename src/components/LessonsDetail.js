import React from "react";
import MediaPlayer from "./MediaPlayer";

function LessonDetail({ lesson, setScreen }) {
  return (
    <div className="screen">
      <h2>{lesson?.title}</h2>

      <button
        className="booking-button"
        onClick={() => setScreen("booking")}
        >
        📅 Book Tutor for this Lesson
    </button>

      {lesson?.text && (
        <div className="lesson-text">
          <h3>Lesson Notes</h3>
          <p>{lesson.text}</p>
        </div>
      )}

      <button className="booking-button" onClick={() => setScreen("booking")}>
        📅 Book Tutor for this Lesson
      </button>

      <div>
        <button onClick={() => setScreen("lessons")}>⬅ Back to Lessons</button>
      </div>
    </div>
  );
}

export default LessonDetail;