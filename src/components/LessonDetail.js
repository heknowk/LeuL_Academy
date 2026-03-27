import React from "react";

function LessonDetail({ lesson, setScreen }) {
  if (!lesson) {
    return <div>No lesson selected</div>;
  }

  return (
    <div>
      <h2>{lesson.title}</h2>
      <p>{lesson.text}</p>

      <button onClick={() => setScreen("lessons")}>
        Back
      </button>
    </div>
  );
}

export default LessonDetail;