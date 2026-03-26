import React, { useState } from "react";


function Booking({ setScreen, lesson, lessons, setLessons }) {
  const studentName = user.name;
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = () => {
    if (!studentName || !date || !time) {
      alert("Please fill in all fields!");
      return;
    }

    // Add booking to lesson
    const updatedLessons = lessons.map((l) => {
      if (l.id === lesson.id) {
        const newBooking = { studentName, date, time, status: "Pending" };
        return { ...l, bookings: [...(l.bookings || []), newBooking] };
      }
      return l;
    });

    setLessons(updatedLessons);
    alert(`Booking requested successfully for ${lesson.title}`);
    setScreen("lessonDetail");
  };

  return (
    <div className="screen">
      <h2>Book a Tutor for: {lesson?.title}</h2>

      <input
        type="text"
        placeholder="Your Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px", width: "80%" }}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px", width: "80%" }}
      />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "10px", width: "80%" }}
      />

      <button onClick={handleBooking} style={{ marginTop: "15px" }}>
        ✅ Request Booking
      </button>

      <button onClick={() => setScreen("lessonDetail")} style={{ marginTop: "10px" }}>
        ⬅ Back to Lesson
      </button>
    </div>
  );
}

export default Booking;