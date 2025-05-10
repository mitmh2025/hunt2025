import React from "react";
import { createRoot } from "react-dom/client";
import tablesort from "tablesort";
import "tablesort/tablesort.css";
import { PUZZLE_STATS } from "./puzzles";

(window as unknown as { Tablesort: typeof tablesort }).Tablesort = tablesort;
require("tablesort/src/sorts/tablesort.number.js");

const BonusStats = ({ PuzzleStats }: { PuzzleStats: React.ComponentType }) => {
  return (
    <>
      <h2>Bonus Stats</h2>

      <PuzzleStats />
    </>
  );
};

const main = async () => {
  document
    .querySelectorAll<HTMLTableElement>("table:has(thead)")
    .forEach((table) => {
      tablesort(table);
    });

  const slug = (window as unknown as { statsSlug?: string }).statsSlug;
  if (!slug) return;

  const elem = document.getElementById("puzzle-bonus-stats-root");
  if (!elem) return;

  const stats = PUZZLE_STATS[slug];
  if (!stats) return;

  const PuzzleStats = await stats();

  createRoot(elem).render(<BonusStats PuzzleStats={PuzzleStats} />);
};

void main();
