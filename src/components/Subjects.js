import React from "react";

const subjectsByGrade = {
  4: ["Mathematics", "English", "Science", "Social Studies"],
  5: ["Mathematics", "English", "Science", "History"],
  6: ["Mathematics", "English", "Science", "Geography"],
  7: ["Mathematics", "English", "Physics", "Chemistry"],
  8: ["Mathematics", "English", "Biology", "History"],
  9: ["Mathematics", "English", "Physics", "Economics"],
  10: ["Mathematics", "English", "Biology", "Chemistry"],
};

function Subjects({ setScreen, setSubject, grade }) {
  const subjects = subjectsByGrade[grade] || [];

  return (
    <div className="screen">
      <h2>Grade {grade} - Select Subject</h2>
      <div>
        {subjects.map((subj) => (
          <button
            key={subj}
            onClick={() => {
              setSubject(subj);
              setScreen("lessons");
            }}
          >
            {subj}
          </button>
        ))}
      </div>
      <button onClick={() => setScreen("home")}>⬅ Back to Home</button>
    </div>
  );
}

export default Subjects;