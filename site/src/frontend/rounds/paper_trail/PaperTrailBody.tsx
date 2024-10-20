import React, { Fragment } from "react";
import { type TeamState } from "../../../../lib/api/client";
import PuzzleLink, { PuzzleIcon } from "../../components/PuzzleLink";
import { Desk, DeskItem } from "./Layout";
import { PaperTrailFonts } from "./PaperTrailFonts";
import { type PaperTrailObject, type PaperTrailState } from "./types";

const PaperTrailBody = ({
  state,
  teamState,
}: {
  state: PaperTrailState;
  teamState: TeamState;
}) => {
  const sections = state.groups.map((group) => {
    return (
      <Fragment key={`label-${group.label}`}>
        <h2>{group.label}</h2>
        <ul>
          {group.items.map((item) => {
            const puzzleState = teamState.puzzles[item.slug];
            return (
              <li key={item.slug}>
                <PuzzleLink
                  lockState={puzzleState?.locked ?? "locked"}
                  answer={puzzleState?.answer}
                  currency={teamState.currency}
                  title={item.title}
                  slug={item.slug}
                />
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  });
  const objects = state.imagery.map((item: PaperTrailObject) => {
    const aStyle = {
      left:
        item.pos.left !== undefined
          ? `min(calc(100vw * ${item.pos.left} / 1920), ${item.pos.left}px)`
          : undefined,
      right:
        item.pos.right !== undefined
          ? `min(calc(100vw * ${item.pos.right} / 1920), ${item.pos.right}px)`
          : undefined,
      top:
        item.pos.top !== undefined
          ? `min(calc(100vw * ${item.pos.top} / 1920), ${item.pos.top}px)`
          : undefined,
      bottom:
        item.pos.bottom !== undefined
          ? `min(calc(100vw * ${item.pos.bottom} / 1920), ${item.pos.bottom}px)`
          : undefined,
      // maskImage: `url(${item.asset})`,
      // maskSize: "contain",
    };
    const imgStyle = {
      width: `min(calc(100vw * ${item.width} / 1920), ${item.width}px)`,
    };
    if ("state" in item) {
      const lockState = item.state === "solved" ? "unlocked" : item.state;
      // TODO: figure out what to do, interactivity-wise, when the puzzle is still locked.
      // In that circumstance, we don't want to link to the puzzle yet since the puzzle page will 404.
      // We should show some button/unlock/modal overlay?
      return (
        <DeskItem
          key={item.slug}
          style={aStyle}
          href={
            item.state !== "unlockable" ? `/puzzles/${item.slug}` : undefined
          }
        >
          <img src={item.asset} alt={item.alt} style={imgStyle} />
          <span className="tooltip">
            <span className="name">
              <PuzzleIcon
                lockState={lockState}
                answer={item.answer}
                size={16}
              />{" "}
              <span>{item.title}</span>
            </span>
            {item.answer ? (
              <span className="answer">{item.answer}</span>
            ) : undefined}
          </span>
        </DeskItem>
      );
    } else {
      return (
        <DeskItem key={item.title} style={aStyle} href={item.href}>
          <img src={item.asset} alt={item.alt} style={imgStyle} />
          <span className="tooltip">Notes</span>
        </DeskItem>
      );
    }
  });
  return (
    <Fragment key="paper-trail">
      <PaperTrailFonts />
      <Desk>{objects}</Desk>
      <h1>The Paper Trail</h1>
      {sections}
    </Fragment>
  );
};

export default PaperTrailBody;
