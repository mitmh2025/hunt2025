import React, { ReactNode } from 'react';
import HUNT from '../../puzzledata';

const SHOW_DEV_PANE = true;

const renderDevPane = (session: object | undefined) => {
  if (process.env.NODE_ENV !== "development" || !SHOW_DEV_PANE || !session) return undefined;

  const rounds = HUNT.rounds.map((round) => {
    const puzzleCells = round.puzzles.map((puzzleSlot) => {
      let title = puzzleSlot.id;
      let slug = undefined;
      if (puzzleSlot.assignment) {
        title = puzzleSlot.assignment.title;
        slug = puzzleSlot.assignment.slug;
      }
      // TODO: do something visually different if the puzzle is locked/visible/unlocked/solved (based on data from session)
      let bgcolor = "black";
      // If visible: gray
      // If unlocked: white
      // If solved: green
      const box = (
        <div
          key={puzzleSlot.id}
          style={{ display: "inline-block", width: "8px", height: "8px", backgroundColor: bgcolor, border: `1px solid ${bgcolor}`, margin: "2px" }}
          title={title}
        />
      );
      if (slug) {
        return (
          <a
            key={puzzleSlot.id}
            href={`/puzzles/${slug}`}
          >
            {box}
          </a>
        );
      }

      return box;
    });
    return (
      <div key={round.key}>
        <h4><a href={`/rounds/${round.slug}`}>{round.title}</a></h4>
        <div>
          {puzzleCells}
        </div>
      </div>
    );
  });


  return (
    <div style={{flex: 0, minWidth: "200px", height: "100vh", backgroundColor: "#eee" }}>
      <h2>Devtools</h2>
      <h3>Nav</h3>
      {rounds}
      <h3>Actions</h3>
      <ul>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </div>
  );
};

const Layout = ({ children, scripts, title, session }: {
  children: ReactNode,
  scripts?: string[],
  title?: string,
  session?: object,
}) => {
  return (
    <html>
      <head>
        {title && <title>{title}</title>}
        {scripts && scripts.map((s) => `<script src="${s}"></script>`)}
      </head>
      <body>
        <div style={{display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start"}}>
          <div style={{flex: 1}}>
            {children}
          </div>
          {renderDevPane(session)}
        </div>
      </body>
    </html>
  );
};

export default Layout;
