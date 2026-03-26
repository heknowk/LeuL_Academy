import React, { useState } from "react";
const totalLessons = lessons.length;

const totalBookings = bookedLessons.length;

const completedCount = completedLessons.length;

const completionRate =
  totalBookings > 0
    ? Math.round((completedCount / totalBookings) * 100)
    : 0;

function StudentDashboard({ setScreen, lessons }) {
  const [studentName, setStudentName] = useState("John Doe"); // Example
  const [completedLessons, setCompletedLessons] = useState([]);

  const bookedLessons = lessons
    .flatMap((lesson) => (lesson.bookings || [])
      .filter((b) => b.studentName === studentName)
      .map((b) => ({ ...b, title: lesson.title, grade: lesson.grade, subject: lesson.subject }))
    );

  const recentLessons = lessons.slice(-5);

  return (
    <div className="screen">
      <h1>Welcome, {studentName}</h1>
                            <div className="summary-container">
                            <div className="summary-card">
                                <h2>{totalLessons}</h2>
                                <p>Total Lessons</p>
                            </div>

                            <div className="summary-card">
                                <h2>{totalBookings}</h2>
                                <p>Your Bookings</p>
                            </div>

                            <div className="summary-card">
                                <h2>{completionRate}%</h2>
                                <p>Completion Rate</p>
                            </div>
                            </div>
      <h3>Recent Lessons</h3>
      {recentLessons.map((lesson) => (
        <div className="dashboard-card" key={lesson.id}>
          <div className="lesson-title">{lesson.title}</div>
          <div className="lesson-meta">{lesson.subject} - Grade {lesson.grade}</div>
          <div>
            {lesson.video && "🎥"} {lesson.audio && "🎧"} {lesson.text && "📄"}
          </div>
        </div>
      ))}

      <h3 style={{ marginTop: "30px" }}>Your Booked Lessons</h3>
      {bookedLessons.length > 0 ? (
        bookedLessons.map((b, idx) => {
          const isCompleted = completedLessons.includes(b.title);
          return (
            <div className="dashboard-card" key={idx}>
              <div className="lesson-title">{b.title}</div>
              <div className="lesson-meta">
                {b.subject} - Grade {b.grade} | {b.date} {b.time}
                <span className={`booking-status ${
                  b.status === "Pending" ? "status-pending" :
                  b.status === "Accepted" ? "status-accepted" :
                  "status-rejected"
                }`}>
                  {isCompleted ? "Completed" : b.status}
                </span>
              </div>
              {b.status === "Accepted" && !isCompleted && (
                <button onClick={() => setCompletedLessons([...completedLessons, b.title])}>
                  Mark as Completed ✅
                </button>
              )}
              {isCompleted && (
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "100%" }} />
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No booked lessons yet.</p>
      )}

      <button style={{ marginTop: "30px" }} onClick={() => setScreen("home")}>
        ⬅ Back to Home
      </button>
    </div>
  );
}
<button
  onClick={() => {
    localStorage.removeItem("user");
    window.location.reload();
  }}
>
  🚪 Logout
</button>

export default StudentDashboard;