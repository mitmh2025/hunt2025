import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";
import solution from "./assets/solution.png";

const StyledTable = styled.table`
  margin: 1em 0;
  td,
  th {
    padding: 0 8px;
  }
`;

const Red = styled.span`
  color: red;
`;

const DATA: {
  cw: string;
  link: string;
  title: string;
  media: string;
  entity: string;
  epithet: string;
  epithetOrder: number;
}[] = [
  {
    cw: "Obscured and unnatural faces",
    link: "https://www.youtube.com/watch?v=sEDzsfDlwtc",
    title: "Air Conditioner (AC) Installation Tutorial, Proper",
    media: "alantutorial",
    entity: "The Stranger",
    epithet: "hides",
    epithetOrder: 8,
  },
  {
    cw: "Anorexia and hemophilia",
    link: "https://en.wikipedia.org/wiki/Amends",
    title: "Amends",
    media: "Buffy the Vampire Slayer",
    entity: "The Flesh",
    epithet: "bleeds",
    epithetOrder: 13,
  },
  {
    cw: "Extreme heat and flames",
    link: "https://en.wikipedia.org/wiki/List_of_Twin_Peaks_episodes",
    title: "Checkmate",
    media: "Twin Peaks",
    entity: "The Desolation",
    epithet: "burns",
    epithetOrder: 10,
  },
  {
    cw: "Interment and suffocation",
    link: "https://knifepointhorror.libsyn.com/corpse",
    title: "corpse",
    media: "Knifepoint Horror",
    entity: "The Buried",
    epithet: "chokes",
    epithetOrder: 3,
  },
  {
    cw: "Laceration and mutilation",
    link: "https://scp-wiki.wikidot.com/scp-1812",
    title: "Extralunar Meme (SCP-1812)",
    media: "The SCP Foundation",
    entity: "The Slaughter",
    epithet: "rips",
    epithetOrder: 12,
  },
  {
    cw: "Rot and insects",
    link: "https://en.wikipedia.org/wiki/Heroes_season_1",
    title: "Homecoming",
    media: "Heroes",
    entity: "The Corruption",
    epithet: "crawls",
    epithetOrder: 2,
  },
  {
    cw: "Perdition",
    link: "https://en.wikipedia.org/wiki/Mr._Denton_on_Doomsday",
    title: "Mr. Denton on Doomsday",
    media: "The Twilight Zone",
    entity: "The End",
    epithet: "dies",
    epithetOrder: 14,
  },
  {
    cw: "Venomous spiders",
    link: "https://en.wikipedia.org/wiki/Orientation_(Lost)",
    title: "Orientation",
    media: "Lost",
    entity: "The Web",
    epithet: "weaves",
    epithetOrder: 9,
  },
  {
    cw: "Rapid descents",
    link: "https://www.youtube.com/watch?v=qVZ-8BgiB4c",
    title: "Pioneer Days",
    media: "Welcome to Night Vale",
    entity: "The Vast",
    epithet: "falls",
    epithetOrder: 5,
  },
  {
    cw: "Abyssal labyrinths",
    link: "https://en.wikipedia.org/wiki/Rachel,_Jack_and_Ashley_Too",
    title: "Rachel, Jack and Ashley Too",
    media: "Black Mirror",
    entity: "The Spiral",
    epithet: "twists",
    epithetOrder: 6,
  },
  {
    cw: "Relentless pursuit",
    link: "https://en.wikipedia.org/wiki/Tempus_Fugit_(The_X-Files)",
    title: "Tempus Fugit",
    media: "The X-Files",
    entity: "The Hunt",
    epithet: "hunts",
    epithetOrder: 11,
  },
  {
    cw: "Technological surveillance",
    link: "https://www.oldgodsofappalachia.com/episodes/2019-12-13/episode-0_episode-45-the-bad-death-and-resurrection-of-annie-messer/201911141002206049",
    title: "The Bad Death and Resurrection of Annie Messner",
    media: "Old Gods of Appalachia",
    entity: "The Eye",
    epithet: "You who watch…",
    epithetOrder: 1,
  },
  {
    cw: "Gouging of eyes",
    link: "https://www.lorepodcast.com/episodes/episode-113-word-of-mouth",
    title: "Word of Mouth",
    media: "The Lore Podcast",
    entity: "The Dark",
    epithet: "blinds",
    epithetOrder: 4,
  },
  {
    cw: "Missing and abandoned children",
    link: "https://www.youtube.com/watch?v=jh09uIN6tl0",
    title: "You Are On the Fastest Available Route",
    media: "Local 58",
    entity: "The Lonely",
    epithet: "leaves",
    epithetOrder: 7,
  },
];

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Each of the links/text blocks is a reference or homage to a famous
        serialized suspense or horror property—specifically to a particular
        episode of that series. The list is presented sorted by episode title as
        an aid in solving, and as a clue that the episode titles are of import.
      </p>
      <StyledTable>
        <tr>
          <th>Content Warning</th>
          <th>Episode</th>
          <th>Media property</th>
        </tr>
        {DATA.map(({ cw, link, title, media }, i) => (
          <tr key={`media-${i}`}>
            <td>{cw}</td>
            <td>
              <a href={link} target="_blank" rel="noreferrer">
                {title}
              </a>
            </td>
            <td>{media}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        The flavortext makes three references to{" "}
        <a
          href="https://rustyquill.com/show/the-magnus-archives/"
          target="_blank"
          rel="noreferrer"
        >
          The Magnus Archives
        </a>{" "}
        (TMA), another episodic horror series:
      </p>
      <ul>
        <li>“the tunnels beneath the institute”</li>
        <li>“magnify”</li>
        <li>“mass […] ritual”</li>
      </ul>
      <p>
        Each of the noted content warnings can be uniquely associated with one
        of{" "}
        <a
          href="https://the-magnus-archives.fandom.com/wiki/The_Entities"
          target="_blank"
          rel="noreferrer"
        >
          The Entities
        </a>{" "}
        from TMA:
      </p>
      <StyledTable>
        <tr>
          <th>Content warning</th>
          <th>Entity</th>
        </tr>
        {DATA.map(({ cw, entity }, j) => (
          <tr key={`entity-${j}`}>
            <td>{cw}</td>
            <td>{entity}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        If you sort The Entities by{" "}
        <a
          href="https://the-magnus-archives.fandom.com/wiki/The_Mass_Ritual#Incantation"
          target="_blank"
          rel="noreferrer"
        >
          the order in which they are invoked in The Mass Ritual
        </a>{" "}
        in TMA (or if you simply sort to match the content warnings to the
        apropos words in the invocation), you get the following ordering (with
        the associated episode titles). This sort is clued by the flavortext{" "}
        <i>“mass ritual,”</i> as well as{" "}
        <i>
          “run and scream and escape […] find some order after the awful dread.”
        </i>
      </p>
      <StyledTable>
        <tr>
          <th>Content warning</th>
          <th>Invocation word</th>
          <th>Entity</th>
          <th>Episode</th>
        </tr>
        {DATA.toSorted((a, b) => a.epithetOrder - b.epithetOrder).map(
          ({ cw, epithet, entity, title }, k) => (
            <tr key={`extraction-${k}`}>
              <td>
                <strong>{cw.slice(0, 1)}</strong>
                {cw.slice(1)}
              </td>
              <td>{epithet}</td>
              <td>{entity}</td>
              <td>{title}</td>
            </tr>
          ),
        )}
      </StyledTable>
      <p>
        (The Eye is off by itself at the beginning of the incantation; this is
        why the flavortext suggests <em>“some order”</em> can be found{" "}
        <i>“after the awful dread.”</i>)
      </p>
      <p>
        Note that if you read down the capitalized first letters of the content
        warnings in this order, it reads <Mono>TRIGRAM OVERLAP</Mono>. There is
        a unique staggered trigram overlapping possible within the episode
        titles as arranged:
      </p>
      <ul>
        <li>
          The Bad Death and Resur<Red>REC</Red>tion of Annie Messner
        </li>
        <li>
          Hom<Red>ECO</Red>ming
        </li>
        <li>
          <Red>COR</Red>pse
        </li>
        <li>
          W<Red>ORD</Red> of Mouth
        </li>
        <li>
          Pionee<Red>R DA</Red>ys
        </li>
        <li>
          Rachel, Jack an<Red>D AS</Red>hley Too
        </li>
        <li>
          You Are On the F<Red>AST</Red>est Available Route
        </li>
        <li>
          Air Conditioner (AC) In<Red>STA</Red>llation Tutorial, Proper
        </li>
        <li>
          Orien<Red>TAT</Red>ion
        </li>
        <li>
          Checkm<Red>ATE</Red>
        </li>
        <li>
          <Red>TEM</Red>pus Fugit
        </li>
        <li>
          Extralunar M<Red>EME</Red>
        </li>
        <li>
          A<Red>MEN</Red>ds
        </li>
        <li>
          Mr. D<Red>ENT</Red>on on Doomsday
        </li>
      </ul>
      <p>
        This spells out <Mono>RECORD A STATEMENT</Mono>.
      </p>
      <p>
        The grid at the bottom of the page is provided as a solving aid. When
        the titles are entered in the properly sorted order, the overlapping
        trigram staircase is more obvious.
      </p>
      <LinkedImage
        src={solution}
        alt="A large rectangular grid holding all of the episode titles. A trigram ladder is highlighted in yellow, spelling out RECORD A STATEMENT."
      />
      <p>
        If you sent us a statement, in the style of The Magnus Archives
        (“Statement begins…”), you would have received the answer{" "}
        <PuzzleAnswer>POSANGAR</PuzzleAnswer>.
      </p>
    </>
  );
};

export default Solution;
