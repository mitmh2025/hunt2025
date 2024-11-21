import React from "react";

export default function LogIn({
  error,
  username,
}: {
  error?: string;
  username?: string;
}) {
  return (
    <div>
      <h1>Log In</h1>
      {error && <p>{error}</p>}
      <form method="post">
        <label>
          Username:
          <input type="text" name="username" value={username} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
