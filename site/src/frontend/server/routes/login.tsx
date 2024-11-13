import { type Request } from "express";
import React from "react";

export function hackLoginGetHandler(_req: Request) {
  const node = (
    <div>
      <h1>Log in</h1>
      <form method="post">
        <div>
          <label>Password:</label><input type="password" name="password" value="" />
          <input type="hidden" name="username" value="team" />
        </div>
        <div>
          <button type="submit">Log in</button>
        </div>
      </form>
    </div>
  );
  return { node };
}
