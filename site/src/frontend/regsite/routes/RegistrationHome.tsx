import React from "react";

export default function RegistrationHome({ isAuthed }: { isAuthed: boolean }) {
  return (
    <div>
      <h1>Registration</h1>
      <p>
        {isAuthed ? (
          <a href="/registration">Edit registration</a>
        ) : (
          <a href="/registration/new">Register</a>
        )}
      </p>
      <p>
        {isAuthed ? <a href="/logout">Log Out</a> : <a href="/login">Log In</a>}
      </p>
    </div>
  );
}
