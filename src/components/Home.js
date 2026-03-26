import React from "react";

const grades = [4, 5, 6, 7, 8, 9, 10];

function Home({ setScreen, setGrade }) {
  return (
    <div className="screen">
      <h1>Leul Academy</h1>
      <p>Learn Smarter at Home</p>

      <div className="grade-selection">
        {grades.map((g) => (
          <button
            key={g}
            onClick={() => {
              setGrade(g);
              setScreen("subjects");
            }}
          >
            Grade {g}
          </button>
        ))}
      </div>

      <div className="buttons">
        <button onClick={() => setScreen("studentDashboard")}>📚 Start Learning</button>
        <button onClick={() => setScreen("teacherDashboard")}>👨🏫 Teacher Dashboard</button>
      </div>
    </div>
  );
}

export default Home;