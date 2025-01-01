import { styled } from "styled-components";
import { type BigBoardPuzzle, type BigBoardTeam } from "../opsdata/bigBoard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Round = styled.div`
  width: 500px;
  height: 100%;
  margin: 4px;
  font-size: 8px;
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

const Puzzle = styled.a`
  border: 1px solid black;
  width: 40px;
  height: 40px;
  margin: 2px;
  padding: 2px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
  text-decoration: none;
`;

const Meta = styled(Puzzle)`
  flex-basis: 0;
  flex-grow: 1;
  border: 1px solid black;
  font-size: 12px;
  padding: 0px 2px;
  -webkit-line-clamp: 2;
`;

const Interaction = styled(Puzzle)`
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  text-align: center;
`;

const stateColors = {
  solved: "#4caf50",
  unlocked: "#03a9f4",
  locked: "#ccc",
  unlockable: "#ccc",
  started: "#03a9f4",
  complete: "#4caf50",
};

function transformTitle(title: string) {
  if (title.startsWith("Shell Corporation ")) {
    return title.split(":")[1];
  }

  if (title.startsWith("Interview at the")) {
    return title.substring("Interview at the".length);
  }

  if (title.endsWith("(Under Blacklight)")) {
    return `Re-solve ${title.substring(0, title.length - "(Under Blacklight)".length)}`;
  }

  return title;
}

export default function BigBoardTeamDetail({
  team,
  onClickPuzzle,
}: {
  team: BigBoardTeam;
  onClickPuzzle: (p: BigBoardPuzzle) => void;
}) {
  function clickHandler(puzzle: BigBoardPuzzle) {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      onClickPuzzle(puzzle);
    };
  }

  return (
    <Wrapper>
      {team.rounds.map((round) => (
        <Round key={round.slug}>
          {round.supermetas.length > 0 && (
            <MetaRow>
              {round.supermetas.map((meta) => (
                <Meta
                  key={meta.slug}
                  style={{ backgroundColor: stateColors[meta.state] }}
                  onClick={clickHandler(meta)}
                  href="#"
                >
                  {transformTitle(meta.title)}
                </Meta>
              ))}
            </MetaRow>
          )}
          <MetaRow>
            {round.metas.map((meta) => (
              <Meta
                key={meta.slug}
                style={{ backgroundColor: stateColors[meta.state] }}
                onClick={clickHandler(meta)}
                href="#"
              >
                {transformTitle(meta.title)}
              </Meta>
            ))}
          </MetaRow>
          <PuzzleRow>
            {round.puzzles.map((puzzle) => (
              <Puzzle
                key={puzzle.slug}
                style={{ backgroundColor: stateColors[puzzle.state] }}
                onClick={clickHandler(puzzle)}
                href="#"
              >
                {transformTitle(puzzle.title)}
              </Puzzle>
            ))}
          </PuzzleRow>
          {round.interactions.length > 0 && (
            <PuzzleRow>
              {round.interactions.map((interaction) => (
                <Interaction
                  key={interaction.id}
                  style={{
                    backgroundColor: stateColors[interaction.state],
                  }}
                >
                  {transformTitle(interaction.title)}
                </Interaction>
              ))}
            </PuzzleRow>
          )}
        </Round>
      ))}
    </Wrapper>
  );
}
