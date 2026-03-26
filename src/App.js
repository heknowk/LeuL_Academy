
if (!user) {
  return <Login setUser={setUser} />;
}

import React, { useState } from "react";
import Home from "./components/Home";
import Subjects from "./components/Subjects";
import Lessons from "./components/Lessons";
import LessonDetail from "./components/LessonDetail";
import Booking from "./components/Booking";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import { useEffect } from "react";
import Login from "./components/Login";


useEffect(() => {
  localStorage.setItem("lessons", JSON.stringify(lessons));
}, [lessons]);

useEffect(() => {
  localStorage.setItem("user", JSON.stringify(user));
}, [user]);


const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
});
function App() {
  const [screen, setScreen] = useState("home");
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const [lessons, setLessons] = useState(() => {
  const savedLessons = localStorage.getItem("lessons");
  return savedLessons ? JSON.parse(savedLessons) : [
    {
      id: 1,
      grade: 4,
      subject: "Mathematics",
      title: "Introduction to Numbers",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      audio: "https://www.w3schools.com/html/horse.mp3",
      text: "Learn numbers and counting 1-100.",
      bookings: []
    }
  ];
});

  return (
    <div className="app">
      {screen === "home" && (
        <Home setScreen={setScreen} setGrade={setSelectedGrade} />
      )}

      {screen === "subjects" && (
        <Subjects
          grade={selectedGrade}
          setScreen={setScreen}
          setSubject={setSelectedSubject}
        />
      )}

      {screen === "lessons" && (
        <Lessons
          grade={selectedGrade}
          subject={selectedSubject}
          setScreen={setScreen}
          setLesson={setSelectedLesson}
          lessons={lessons}
        />
      )}

      {screen === "lessonDetail" && (
        <LessonDetail lesson={selectedLesson} setScreen={setScreen} />
      )}

      {screen === "booking" && (
            <Booking
                setScreen={setScreen}
                lesson={selectedLesson}
                lessons={lessons}
                setLessons={setLessons}
            />
            )}

     {screen === "studentDashboard" && user?.role === "student" && (
  <StudentDashboard setScreen={setScreen} lessons={lessons} user={user} />
)}

{screen === "teacherDashboard" && user?.role === "teacher" && (
  <TeacherDashboard
    setScreen={setScreen}
    lessons={lessons}
    setLessons={setLessons}
    user={user}
  />
)}
    </div>
  );
}

export default App;