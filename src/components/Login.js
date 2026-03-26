import React, { useState } from "react";

function Login({ setUser }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");

  const handleLogin = () => {
    if (!name) {
      alert("Enter your name");
      return;
    }

    const userData = { name, role };
    setUser(userData);
  };

  return (
    <div className="screen">
      <h1>Leul Academy Login</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "10px", width: "80%", margin: "10px auto" }}
      />

      <div style={{ margin: "10px" }}>
        <button onClick={() => setRole("student")}>
          🎓 Student
        </button>
        <button onClick={() => setRole("teacher")}>
          👨‍🏫 Teacher
        </button>
      </div>

      <p>Selected Role: <strong>{role}</strong></p>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;