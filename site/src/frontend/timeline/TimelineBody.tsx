import React from "react";
import { styled } from "styled-components";
import { PageWrapper } from "../components/PageLayout";
import type { TimelineActivityLogEntry } from "./types";

const BillieBlurb = styled.div`
  font-family: "EB Garamond";
  margin-left: 2rem;
  font-size: 20px;
`;

const Entry = styled.div`
  margin: 1em 0;
`;

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TimelineBody = ({ log }: { log: TimelineActivityLogEntry[] }) => {
  return (
    <PageWrapper>
      <>
        {log.map(({ answer, node, timestamp, type }, i) => {
          const time = new Date(timestamp);
          const day = DAYS[time.getDay()];
          const hour = time.getHours();
          const min = time.getMinutes();
          const stamp = `${day}, ${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
          let text = (
            <>
              {stamp}. {node.text}
            </>
          );
          if (type === "puzzle_solved" && answer) {
            const [before, after] = node.text.split("***");
            text = (
              <>
                <span>{stamp}. </span>
                <span>{before}</span>
                <strong>{answer}</strong>
                <span>{after}</span>
              </>
            );
          }

          let action = <></>;
          switch (node.event) {
            case "round_unlocked":
              action = (
                <span>
                  Unlocked round:{" "}
                  <a href={`/rounds/${node.slug}`}>{node.title}</a>
                </span>
              );
              break;
            case "puzzle_unlocked":
              action = (
                <span>
                  Unlocked puzzle:{" "}
                  <a href={`/puzzles/${node.slug}`}>{node.title}</a>
                </span>
              );
              break;
            case "puzzle_solved":
              action = (
                <span>
                  Solved puzzle:{" "}
                  <a href={`/puzzles/${node.slug}`}>{node.title}</a>
                </span>
              );
              break;
            case "interaction_unlocked":
              action = (
                <span>
                  Unlocked interaction:{" "}
                  <a href={`/interactions/${node.slug}`}>{node.title}</a>
                </span>
              );
              break;
            case "interaction_completed":
              action = (
                <span>
                  Completed interaction:{" "}
                  <a href={`/interactions/${node.slug}`}>{node.title}</a>
                </span>
              );
              break;
          }
          return (
            <Entry key={i}>
              <div>{action}</div>
              <BillieBlurb>
                <i>{text}</i>
              </BillieBlurb>
            </Entry>
          );
        })}
      </>
    </PageWrapper>
  );
};

export default TimelineBody;
