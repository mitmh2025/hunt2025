import { type Request } from "express";
import React from "react";

export function hackLoginGetHandler(_req: Request) {
  const node = (
    <div>
      <h1>Log in</h1>
      <form method="post">
        <div>
          <label>
            Username:{" "}
            <select name="username">
              <option value="">Select...</option>
              <option value="team">team (no magic)</option>
              <option value="unlockable">
                unlockable (all puzzles unlockable)
              </option>
              <option value="unlocked">
                unlocked (all puzzles unlocked, recommended for validating
                postprod)
              </option>
              <option value="solved">
                solved (all puzzles already solved; beware spoilers!)
              </option>
              <option value="is1">Illegal Search (Stage 1)</option>
              <option value="is2">Illegal Search (Stage 2)</option>
              <option value="is3">Illegal Search (Stage 3)</option>
            </select>
          </label>
        </div>
        <div>
          <input type="hidden" name="password" value="password" />
        </div>
        <div>
          <button type="submit">Log in</button>
        </div>
      </form>
    </div>
  );
  return { node };
}
