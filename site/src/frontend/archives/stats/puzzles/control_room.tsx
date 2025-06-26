import { type Options } from "csv-parse";
import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { styled } from "styled-components";
import { StyledPuzzleStatsTable } from "../../../components/StatsLayout";
import { ErrorText } from "../../../components/StyledUI";
import Loading from "../../components/Loading";
import instructionsCsvUrl from "../assets/control_room_instructions.csv";
import useCSV from "../useCSV";

type InstructionRow = {
  timestamp: DateTime;
  noun: string;
  verb: string;
};

const InstructionParseOptions: Options = {
  columns: true,
  cast: (value, context) => {
    if (context.column === "timestamp") {
      return DateTime.fromISO(value);
    }
    return value;
  },
};

const Tables = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const PuzzleStats = () => {
  const { loading, error, data } = useCSV<InstructionRow>({
    url: instructionsCsvUrl,
    parseOptions: InstructionParseOptions,
  });

  const { favoriteNouns, favoriteVerbs, favoriteInstructions } = useMemo(() => {
    const favoriteNouns = new Map<string, number>();
    const favoriteVerbs = new Map<string, number>();
    const favoriteInstructions = new Map<string, number>();

    for (const row of data) {
      const nounCount = favoriteNouns.get(row.noun) ?? 0;
      favoriteNouns.set(row.noun, nounCount + 1);

      const verbCount = favoriteVerbs.get(row.verb) ?? 0;
      favoriteVerbs.set(row.verb, verbCount + 1);

      const instruction = `${row.verb} THE ${row.noun}`;

      const instructionCount = favoriteInstructions.get(instruction) ?? 0;
      favoriteInstructions.set(instruction, instructionCount + 1);
    }

    const summarize = (d: Map<string, number>, n = 10) => {
      return [...d.entries()].toSorted(([, a], [, b]) => b - a).slice(0, n);
    };

    return {
      favoriteNouns: summarize(favoriteNouns),
      favoriteVerbs: summarize(favoriteVerbs),
      favoriteInstructions: summarize(favoriteInstructions, 20),
    };
  }, [data]);

  if (loading) return <Loading />;
  if (error) {
    return (
      <ErrorText>
        An error occurred while loading additional statistics: {String(error)}
      </ErrorText>
    );
  }

  return (
    <>
      <p>
        Unfortunately, our logs were not sufficient to assign instructions that
        teams submitted back to the team that did so. However, we do still have
        all instructions that any team submitted, and we believe there is still
        interesting and entertaining analysis from that.
      </p>

      <p>Total instructions shown to players: {data.length}</p>

      <Tables>
        <div>
          <h3>Favorite Nouns</h3>
          <StyledPuzzleStatsTable>
            <thead>
              <tr>
                <th>Noun</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {favoriteNouns.map(([noun, count]) => (
                <tr key={noun}>
                  <td>{noun}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </StyledPuzzleStatsTable>
        </div>

        <div>
          <h3>Favorite Verbs</h3>
          <StyledPuzzleStatsTable>
            <thead>
              <tr>
                <th>Verb</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {favoriteVerbs.map(([verb, count]) => (
                <tr key={verb}>
                  <td>{verb}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </StyledPuzzleStatsTable>
        </div>
      </Tables>

      <h3>Favorite Instructions</h3>
      <StyledPuzzleStatsTable>
        <thead>
          <tr>
            <th>Instruction</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {favoriteInstructions.map(([instruction, count]) => (
            <tr key={instruction}>
              <td>{instruction}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </StyledPuzzleStatsTable>
    </>
  );
};

export default PuzzleStats;
