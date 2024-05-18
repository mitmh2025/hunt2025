import { Request } from "express";
import React from "react";
import Layout from "../../components/Layout";

export function hackLoginGetHandler(_req: Request) {
  return (
    <Layout>
      <div>
        <h1>Log in</h1>
        <form method="post">
          <div>
            <label>
              Username: <input type="text" name="username" />
            </label>
          </div>
          <div>
            <label>
              Password: <input type="password" name="password" />
            </label>
          </div>
          <div>
            <button type="submit">Log in</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
