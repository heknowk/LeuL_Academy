
import React, { useState } from "react";
const totalLessons = lessons.length;
const [search, setSearch] = useState("");
const allBookings = lessons.flatMap(l => l.bookings || []);

const pendingBookings = allBookings.filter(b => b.status === "Pending").length;
const acceptedBookings = allBookings.filter(b => b.status === "Accepted").length;
const filteredLessons = lessons.filter((lesson) =>
  lesson.title.toLowerCase().includes(search.toLowerCase())
);
const subjectsByGrade = {
  4: ["Mathematics", "English", "Science", "Social Studies"],
  5: ["Mathematics", "English", "Science", "History"],
  6: ["Mathematics", "English", "Science", "Geography"],
  7: ["Mathematics", "English", "Physics", "Chemistry"],
  8: ["Mathematics", "English", "Biology", "History"],
  9: ["Mathematics", "English", "Physics", "Economics"],
  10: ["Mathematics", "English", "Biology", "Chemistry"],
};

function TeacherDashboard({ setScreen, lessons, setLessons }) {
  const [newLesson, setNewLesson] = useState({
    grade: 4,
    subject: "Mathematics",
    title: "",
    video: "",
    audio: "",
    text: "",
  });

  const handleAddLesson = () => {
    if (!newLesson.title) return;
    const id = Date.now();
    setLessons([...lessons, { ...newLesson, id }]);
    setNewLesson({ grade: 4, subject: "Mathematics", title: "", video: "", audio: "", text: "" });
    alert("Lesson added successfully!");
  };

  return (
    <div className="screen">
      <h1>Leul Academy - Teacher Dashboard</h1>
                                        <div className="summary-container">
                        <div className="summary-card">
                            <h2>{totalLessons}</h2>
                            <p>Total Lessons</p>
                        </div>

                        <div className="summary-card">
                            <h2>{pendingBookings}</h2>
                            <p>Pending Requests</p>
                        </div>

                        <div className="summary-card">
                            <h2>{acceptedBookings}</h2>
                            <p>Accepted Bookings</p>
                        </div>
                        </div>
      <div className="lesson-upload">
        <h3>Upload New Lesson</h3>

        <select
          value={newLesson.grade}
          onChange={(e) =>
            setNewLesson({
              ...newLesson,
              grade: parseInt(e.target.value),
              subject: subjectsByGrade[parseInt(e.target.value)][0],
            })
          }
        >
          {[4,5,6,7,8,9,10].map((g) => <option key={g} value={g}>Grade {g}</option>)}
        </select>

        <select
          value={newLesson.subject}
          onChange={(e) => setNewLesson({ ...newLesson, subject: e.target.value })}
        >
          {(subjectsByGrade[newLesson.grade] || []).map((subj) => (
            <option key={subj} value={subj}>{subj}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Lesson Title"
          value={newLesson.title}
          onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Video URL"
          value={newLesson.video}
          onChange={(e) => setNewLesson({ ...newLesson, video: e.target.value })}
        />
        <input
          type="text"
          placeholder="Audio URL"
          value={newLesson.audio}
          onChange={(e) => setNewLesson({ ...newLesson, audio: e.target.value })}
        />
                    <input
              type="text"
              placeholder="🔍 Search lessons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "10px",
                width: "80%",
                margin: "10px 0",
                borderRadius: "8px",
              }}
            />
        <textarea
          placeholder="Lesson Text"
          value={newLesson.text}
          onChange={(e) => setNewLesson({ ...newLesson, text: e.target.value })}
          rows="4"
          style={{ width: "100%", marginTop: "10px" }}
        />

        <button onClick={handleAddLesson}>➕ Add Lesson</button>
      </div>
<div className="lesson-list" style={{ marginTop: "30px" }}>
  <h3>Existing Lessons & Bookings</h3>
  {filteredLessons.map((lesson) => (
      <div className="dashboard-card" key={lesson.id}>
      <div className="lesson-title">{lesson.title}</div>
      <div className="lesson-meta">{lesson.subject} - Grade {lesson.grade}</div>
      <div>
        {lesson.video && "🎥"} {lesson.audio && "🎧"} {lesson.text && "📄"}
      </div>

      {lesson.bookings && lesson.bookings.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <strong>Bookings:</strong>
          {lesson.bookings.map((b, idx) => (
            <div key={idx} className="dashboard-card" style={{ marginTop: "5px" }}>
              {b.studentName} | {b.date} {b.time} 
              <span className={`booking-status ${
                b.status === "Pending" ? "status-pending" :
                b.status === "Accepted" ? "status-accepted" :
                "status-rejected"
              }`}>
                {b.status}
              </span>
              {b.status === "Pending" && (
                <>
                  <button style={{ marginLeft: "5px" }} onClick={() => {
                    const updatedLessons = lessons.map((l) => {
                      if (l.id === lesson.id) {
                        const updatedBookings = l.bookings.map((bk, i) =>
                          i === idx ? { ...bk, status: "Accepted" } : bk
                        );
                        return { ...l, bookings: updatedBookings };
                      }
                      return l;
                    });
                    setLessons(updatedLessons);
                  }}>✅</button>
                  <button style={{ marginLeft: "5px" }} onClick={() => {
                    const updatedLessons = lessons.map((l) => {
                      if (l.id === lesson.id) {
                        const updatedBookings = l.bookings.map((bk, i) =>
                          i === idx ? { ...bk, status: "Rejected" } : bk
                        );
                        return { ...l, bookings: updatedBookings };
                      }
                      return l;
                    });
                    setLessons(updatedLessons);
                  }}>❌</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  ))}
</div>

                    <div className="bookings-section" style={{ marginTop: "30px" }}>
                <h3>Booking Requests</h3>
                {lessons.map((lesson) =>
                    lesson.bookings && lesson.bookings.length > 0 ? (
                    <div key={lesson.id} style={{ marginBottom: "15px" }}>
                        <strong>
                        {lesson.grade} {lesson.subject} - {lesson.title}
                        </strong>
                        <ul style={{ marginLeft: "20px", marginTop: "5px" }}>
                        {lesson.bookings.map((b, idx) => (
                            <li key={idx}>
                            {b.studentName} booked on {b.date} at {b.time} (
                            <strong>{b.status}</strong>)
                            {b.status === "Pending" && (
                                <>
                                <button
                                    style={{ marginLeft: "10px" }}
                                    onClick={() => {
                                    const updatedLessons = lessons.map((l) => {
                                        if (l.id === lesson.id) {
                                        const updatedBookings = l.bookings.map((bk, i) =>
                                            i === idx ? { ...bk, status: "Accepted" } : bk
                                        );
                                        return { ...l, bookings: updatedBookings };
                                        }
                                        return l;
                                    });
                                    setLessons(updatedLessons);
                                    }}
                                >
                                    ✅ Accept
                                </button>
                                <button
                                    style={{ marginLeft: "5px" }}
                                    onClick={() => {
                                    const updatedLessons = lessons.map((l) => {
                                        if (l.id === lesson.id) {
                                        const updatedBookings = l.bookings.map((bk, i) =>
                                            i === idx ? { ...bk, status: "Rejected" } : bk
                                        );
                                        return { ...l, bookings: updatedBookings };
                                        }
                                        return l;
                                    });
                                    setLessons(updatedLessons);
                                    }}
                                >
                                    ❌ Reject
                                </button>
                                </>
                            )}
                            </li>
                        ))}
                        </ul>
                    </div>
                    ) : null
                )}
                </div>

      <button onClick={() => setScreen("home")} style={{ marginTop: "20px" }}>
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

export default TeacherDashboard;