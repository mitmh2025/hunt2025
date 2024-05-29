import React from "react";
import type { TeamState } from "../../../../lib/api/client";
import Link from "../../components/Link";

export default function NavBar({ teamState }: { teamState?: TeamState }) {
  let roundsMenu;
  if (teamState) {
    const rounds = Object.entries(teamState.rounds).map(([slug, { title }]) => (
      <li key={slug}>
        <Link href={`/rounds/${slug}`}>{title}</Link>
      </li>
    ));
    roundsMenu = (
      <li className="dropdown">
        Rounds
        <ul>{rounds}</ul>
      </li>
    );
  }
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <input type="checkbox" id="checkbox_toggle" />
        <label htmlFor="checkbox_toggle" className="hamburger">
          &#9776;
        </label>

        <div className="menu">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>

          {roundsMenu}

          {teamState && (
            <li>
              {Object.values(teamState.puzzles).filter((p) => p.answer).length}{" "}
              solved
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
}
