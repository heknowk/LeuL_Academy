import React from "react";

function Login({ setUser }) {
  return (
    <div>
      <h2>Login Page</h2>

      <button
        onClick={() =>
          setUser({ name: "Henok", role: "student" })
        }
      >
        Login as Student
      </button>

      <button
        onClick={() =>
          setUser({ name: "Henok", role: "teacher" })
        }
      >
        Login as Teacher
      </button>
    </div>
  );
}

export default Login;