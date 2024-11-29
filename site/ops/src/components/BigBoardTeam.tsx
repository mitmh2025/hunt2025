import { Box, Tooltip, Typography } from "@mui/material";
import { styled } from "styled-components";
import { type BigBoardTeam } from "../opsdata/bigBoard";

const Wrapper = styled.div`
  width: 300px;
  border: 1px solid black;
  margin: 4px;
  padding: 2px;
`;

const RoundRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const Round = styled.div`
  width: 33.3%;
  height: 100%;
  float: left;
  margin: 4px;
`;

const MetaRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const PuzzleRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Meta = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  border: 1px solid black;
  height: 10px;
  margin: 2px;
`;

const Puzzle = styled.div`
  border: 1px solid black;
  width: 10px;
  height: 10px;
  margin: 2px;
`;

const Interaction = styled(Puzzle)`
  border-radius: 50%;
`;

const stateColors = {
  solved: "green",
  unlocked: "yellow",
  locked: "grey",
  started: "blue",
  complete: "green",
};

function inGroupsOf<T>(array: T[], groupSize: number): T[][] {
  const groups: T[][] = [];
  for (let i = 0; i < array.length; i += groupSize) {
    groups.push(array.slice(i, i + groupSize));
  }
  return groups;
}

export default function BigBoardTeam({ team }: { team: BigBoardTeam }) {
  return (
    <Wrapper>
      <Typography
        sx={{
          textAlign: "center",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
        variant="h6"
      >
        {team.name}
      </Typography>
      <Box>
        {inGroupsOf(team.rounds, 3).map((rounds, i) => (
          <RoundRow key={i}>
            {rounds.map((round) => (
              <Tooltip
                arrow
                placement="top"
                title={round.title}
                key={round.slug}
              >
                <Round>
                  {round.supermetas.length > 0 && (
                    <MetaRow>
                      {round.supermetas.map((meta) => (
                        <Tooltip arrow title={meta.title} key={meta.slug}>
                          <Meta
                            style={{ backgroundColor: stateColors[meta.state] }}
                          />
                        </Tooltip>
                      ))}
                    </MetaRow>
                  )}
                  <MetaRow>
                    {round.metas.map((meta) => (
                      <Tooltip
                        placement="left"
                        title={meta.title}
                        arrow
                        key={meta.slug}
                      >
                        <Meta
                          style={{ backgroundColor: stateColors[meta.state] }}
                        />
                      </Tooltip>
                    ))}
                  </MetaRow>
                  <PuzzleRow>
                    {round.puzzles.map((puzzle) => (
                      <Tooltip
                        placement="left"
                        title={puzzle.title}
                        arrow
                        key={puzzle.slug}
                      >
                        <Puzzle
                          style={{ backgroundColor: stateColors[puzzle.state] }}
                        />
                      </Tooltip>
                    ))}
                  </PuzzleRow>
                  {round.interactions.length > 0 && (
                    <PuzzleRow>
                      {round.interactions.map((interaction) => (
                        <Tooltip
                          placement="left"
                          title={interaction.title}
                          arrow
                          key={interaction.id}
                        >
                          <Interaction
                            style={{
                              backgroundColor: stateColors[interaction.state],
                            }}
                          />
                        </Tooltip>
                      ))}
                    </PuzzleRow>
                  )}
                </Round>
              </Tooltip>
            ))}
          </RoundRow>
        ))}
      </Box>
    </Wrapper>
  );
}
