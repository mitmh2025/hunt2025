import React from "react";
import { styled } from "styled-components";
import Crossword from "../../components/Crossword";
import { StanzaBlock, StyledTD } from "./puzzle";

const EqualTable = styled.table`
  width: 100%;
  table-layout: fixed;
  border: 1px solid black;
  border-collapse: collapse;
`;

const SolutionTH = styled.th`
  border: 1px solid black;
  border-collapse: collapse;
`;

const SolutionTD = styled(StyledTD)`
  border: 1px solid black;
  border-collapse: collapse;
`;

const PoemMovieData = [
  `Love is a rose
  That’s budding and bluffing
  The stuff dreams are made of
  This flightless MacGuffin
  7/7/1941`,

  `CITIZEN Kane`,
  `“Rosebud” MacGuffin`,
  `The MALTESE Falcon`,
  `Sam Spade quote about the falcon`,

  `Love it’s got rhythm
  And it’s here to stay
  It’s given carte blanche
  At a stellar partay
  8/5/1951`,

  `An AMERICAN in Paris`,
  `I Got Rhythm, Love Is Here To Stay, songs`,
  `A Streetcar NAMED Desire`,
  `Blanche Dubois and Stella Kowalski, characters`,

  `Love drama in court
  Black that white did arraign
  "I am so thirsty"
  Mocked Homer’s refrain
  11/8/1962`,

  `To Kill a MOCKINGBIRD`,
  `Courtroom drama, racism plotline; “Mocked” in line 4`,
  `LAWRENCE of Arabia`,
  `In Simpsons parody Homer sings “Thirsty, I am so thirsty” to movie theme`,

  `Love is so strange
  In no room for a fight
  Like a spoonful of sugar
  Makes you high as a kite
  11/7/1964`,

  `Dr. STRANGELOVE, or: How I Learned to Stop Worrying and Love the Bomb`,
  `“Strange” “love” in line 1; “You can’t fight in here; this is the War Room” quote`,
  `Mary POPPINS`,
  `A Spoonful of Sugar, Let’s Go Fly a Kite, songs`,

  `Love is a blaze
  Sky-high does it seethe
  I would smell the smoke
  But it smarts when I breathe
  8/9/1974`,

  `The TOWERING Inferno`,
  `Literal description of movie`,
  `CHINATOWN`,
  `“That must really smart.”  “Only when I breathe” quote`,

  `Love on the beach
  is running to tune
  Sunlight shines on the staff
  With a foot hewn
  8/7/1981`,

  `CHARIOTS of Fire`,
  `Opening/closing scene running on beach to Vangelis theme`,
  `RAIDERS of the Lost Ark`,
  `Indy in the map room with the Staff of Ra; “and take back one kadam…”, i.e., short one foot`,

  `Love for the wiseguy
  It’s funny somehow
  That three at the opera
  Ends with tragic pow pow
  10/9/1990`,

  `GOODFELLAS`,
  `Wiseguy book adaptation; “Funny how?” “How am I funny” quote`,
  `The GODFATHER Part III`,
  `Part “three” final scene, shooting on opera house steps`,

  `Love soars free in the yard
  With a Mozart duet
  Say it with chocolates
  Who knows what you’ll get
  9/7/1994`,

  `The SHAWSHANK Redemption`,
  `Scene where Andy plays Sull’aria duet from Marriage of Figaro`,
  `FORREST Gump`,
  `“Life is a box of chocolates, Forrest”, “You never know what you’re gonna get” quotes`,

  `Love might be senseless
  Its hopes would be dashed
  With a problem to love all
  To the moon and back
  11/6/1995`,

  `Sense and SENSIBILITY`,
  `“Sense” in line 1; “dash” “would” = Dashwood sisters, characters`,
  `APOLLO 13`,
  `“love all” = Jim Lovell, “we’ve had a problem”; trajectory around moon and back`,

  `Love’s the king of the world
  Until it runs foul
  Of corruption that’s unearthed
  By the night owl
  7/12/1997`,

  `TITANIC`,
  `“I’m the king of the world” quote; runs foul = collides with`,
  `L.A. CONFIDENTIAL`,
  `police corruption plotline; murder scene at the Nite Owl Café`,

  `Love at my signal
  Will unleash hell
  That’s found in the water
  By Wichita belle
  9/10/2000`,

  `GLADIATOR`,
  `“At my signal, unleash Hell” quote`,
  `Erin BROCKOVICH`,
  `Chromium-6 in Hinkley groundwater plotline; Erin Brockovich was Miss Wichita (in movie)`,

  `Love’s just a game
  The theory is told
  By songs in Montmartre
  With red sails to behold
  9/6/2001`,

  `A BEAUTIFUL Mind`,
  `Biopic of John Nash, Game Theory pioneer`,
  `MOULIN Rouge!`,
  `Musical set in Montmartre, Paris literal meaning "red (wind)mill" (having sails)`,

  `Love asks many questions
  But replies are amiss
  It isn’t illegal
  If the prez does this
  11/5/2008`,

  `Slumdog MILLIONAIRE`,
  `Plotline WWTBAM questions; final question about Musketeers, answer “are amiss” = Aramis`,
  `FROST/Nixon`,
  `“When the president does it, that means it’s not illegal” quote`,

  `Love it is alien
  You’ll go blue in the face
  If allergic to prawns
  From outer space
  6/8/2009`,

  `AVATAR`,
  `Aliens with blue faces (and bodies)`,
  `DISTRICT 9`,
  `Aliens referred to as “prawns”`,

  `Love needs no words
  With pleasure sounds grand
  From plowing to fighting
  Saved from no man’s land
  6/5/2011`,

  `The ARTIST`,
  `Silent movie homage; first words in film “With pleasure”`,
  `War HORSE`,
  `Plotline: farm horse sold to army in WW1; cut out of barbed wire in No Man’s Land`,

  `Love fights for freedom
  Jingle-jangling chains
  The search in the dark
  Is laden with claims
  9/6/2012`,

  `Django UNCHAINED`,
  `Slavery plot; “Jingle-jangling” ~ Django; un“chain”ed`,
  `Zero Dark THIRTY`,
  `Zero “Dark” Thirty; “search” for Bin “Laden”`,

  `Love for a hound
  If I can dream
  Of dog fighting with rooster
  In the jet stream
  5/8/2022`,

  `ELVIS`,
  `Hound Dog, If I Can Dream, songs`,
  `Top Gun: MAVERICK`,
  `Rooster call sign of Bradley Bradshaw (son of “Goose”); plotline: dog fights / jet fighters`,

  `Love just one man
  It’s enough I would ken
  His love for the bombshell
  Becomes Death in the end
  6/11/2023`,

  `BARBIE`,
  `“I’m Just Ken (and I’m enough)” song; blonde bombshell`,
  `OPPENHEIMER`,
  `Biopic, literal bombshell; “I am become Death” quote`,
];

const formatPoemMovieData = (data: string[]): JSX.Element[] => {
  const elements: JSX.Element[] = [];
  for (let i = 0; i < data.length; i += 5) {
    elements.push(
      <React.Fragment key={i}>
        <tr>
          <SolutionTD rowSpan={2}>
            <StanzaBlock stanza={data[i] ?? ""} />
          </SolutionTD>
          <SolutionTD>
            <p>{data[i + 1]}</p>
          </SolutionTD>
          <SolutionTD>
            <p>{data[i + 2]}</p>
          </SolutionTD>
        </tr>
        <tr>
          <SolutionTD>
            <p>{data[i + 3]}</p>
          </SolutionTD>
          <SolutionTD>
            <p>{data[i + 4]}</p>
          </SolutionTD>
        </tr>
      </React.Fragment>,
    );
  }
  return elements;
};

const SolutionGridCSV = `,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,G,,,,,,,M,,,,,,,,,,B,,,,N,,,,,,,
,,,,,,O,,,,,,,I,,,,,,,,,,R,,,,A,,,,,,,
,,,,,,D,,,,,,,L,,,,,,,,,,O,,,A,M,E,R,I,C,A,N,
,,G,O,O,D,F,E,L,L,A,S,,L,,,,,,,,,,C,,,,E,,,,,,,
,,,,,,A,,,,,,,I,,,,,,,,,,K,,,,D,,,,,,,
,,,,,,T,,,,,,,O,,,G,L,A,D,I,A,T,O,R,,,,,,,,,,
,,,,,,H,,,,,,,N,,,,,,,,,,V,,,,,,,,,,,
,,,,,,E,,,,,,,A,,,,,,,,,,I,,,,,,,,,,,
,,,,,,R,,,,,,,I,,,,,,,,,,C,,,,,,,,,,,
,,,,,,,,,,,,F,R,O,S,T,,,,S,,,H,,,,,,,,,,T,
,,,,,,,,,,,,,E,,,,,,,H,,,,,,,,,,,,,I,
,,,M,,,,,,,,,,,,,,,,,A,,,,,,,,,,,,,T,
,,,O,,,,,M,,,,,,,,,,,,W,,,C,O,N,F,I,D,E,N,T,I,A,L
,,,C,,,,,O,,,,,,,F,O,R,R,E,S,T,,,,,,,,,,,,N,
,,,K,,B,E,A,U,T,I,F,U,L,,,,,,,H,,,,,,,,,,,,,I,
,,,I,,,,,L,,,,,,,H,,,,,A,,,,,B,,,,,,,,C,
,,,N,,,,,I,,,,,,,O,,,,,N,,,,,A,,,,,,,,,
,,,G,,,,,N,,,,,,,R,,,,,K,,,,,R,,,,,,,,,
,,,B,,,,,,,,A,R,T,I,S,T,,,,,,,,,B,,,,,,,,,
,,,I,,,,,,,,,,,,E,,,O,P,P,E,N,H,E,I,M,E,R,,,,,,
L,A,W,R,E,N,C,E,,,,,,,,,,,,,,,,,,E,,,,,,,,,
,,,D,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,C,,,,,,,R,,,,,,,,,,,,,,,,,,,,,,
,,,,,H,,,,,,,A,,,,,,,,D,,,,,,,T,,,,,,,
,,,,,I,,,C,H,A,R,I,O,T,S,,,,,I,,,,U,N,C,H,A,I,N,E,D,,
,,,,,N,,,,,,,D,,,,,,,,S,,,,,,,I,,,,,,,
,,,,,A,,,,,,,E,,,,,A,V,A,T,A,R,,,,,R,,,,,,,
,,,,,T,,,,,,,R,,,,,,,,R,,,,,,,T,,,,,,,
,,,,,O,,,,,,,S,,,,,,,,I,,,,,,,Y,,,,,,,
,,,T,O,W,E,R,I,N,G,,,,,,,,,,C,,,,,,,,,,,,,,
,,,,,N,,,,,,,,,,,,,,,T,,,,,,,,,,,,,,
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
,,,,,,,,,,,,,,P,,,,,,,,,,,,,,,,,,,,
,,,,,,S,T,R,A,N,G,E,L,O,V,E,,,,E,,,,,,,,,,,,,,
,,,,,,,,,,,,,,P,,,,,,L,,,,,,,,C,,,,,,
,,,,,,,,,,,,,,P,,,,M,A,V,E,R,I,C,K,,,I,,,,,,
,,,,,,,A,,,,,,,I,,,,,,I,,,,,,,,T,,,,,,
,,,,,,,P,,,,,,,N,,,,,,S,,,,,,,,I,,,,,,
,,,,,,,O,,,,,,,S,,,,,,,,,,,,,,Z,,,,,,
S,E,N,S,I,B,I,L,I,T,Y,,,,,,,,,,,,,,M,A,L,T,E,S,E,,,,
,,,,,,,L,,,,,,,,,,,,,,,,,,,,,N,,,,,,
,,,,,,,O,,,,,,,,,,,,,,,,,,,,,,,,,,,`;

const SolutionGridFill: string[][] = SolutionGridCSV.split("\n").map((row) =>
  row.split(","),
);

const SolutionGridLabels: string[][] = SolutionGridFill.map((row) =>
  row.map(() => ""),
);

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Solvers are presented with a diagram of criss-crosses and a set of love
        poems accompanied by dates.
      </p>
      <p>
        Taking the background art of crossing Oscar statuettes as a clue,
        solvers should soon realize that the love poems are alluding to movies
        that were nominated for an Academy Award for Best Picture.
      </p>
      <p>
        After studying the poems for some time, solvers will discover that each
        poem actually contains references to two movies and, moreover, that the
        two movies were nominated for Best Picture at the same Academy Awards
        ceremony.
      </p>
      <p>
        Solvers then need to select one word from each movie title for entry
        into the criss-crosses.
      </p>
      <p>
        Confirmation of the correct movie titles and selected words is given by
        the “date” m/d/yyyy accompanying each poem: the “year” is the common
        year yyyy of release of the two movies; the “month” and “date” are the
        lengths m and d of the words in the movie titles. In each poem, the
        first movie title (having a word of length m) is clued by the first two
        lines of the poem and the second movie title (having a word of length d)
        is clued by the final two lines of the poem.
      </p>
      <p>
        The given enumerations {"{m, d}"} also match the{" "}
        {"{horizontal, vertical}"} lengths of the criss-crosses, meaning that
        each pair of words can be entered into a unique criss-cross in the
        diagram such that the pair intersect at a common letter.
      </p>
      <p>
        Reading the intersection letters in right-then-down fashion yields the
        answer FROM RUSSIA WITH LOVE.
      </p>
      <p>Poems and movies referenced:</p>
      <EqualTable>
        <tr>
          <SolutionTH>
            <p>Poem</p>
          </SolutionTH>
          <SolutionTH>
            <p>Movie</p>
          </SolutionTH>
          <SolutionTH>
            <p>Explanation</p>
          </SolutionTH>
        </tr>
        {formatPoemMovieData(PoemMovieData)}
      </EqualTable>
      <p></p>
      <p>The completed criss-crosses:</p>
      <Crossword
        labels={SolutionGridLabels}
        fill={SolutionGridFill}
        getAdditionalCellStyles={({ row, column }) =>
          SolutionGridFill[row]?.[column]
            ? { backgroundColor: "var(--gold-400)" }
            : {}
        }
      />
      <p></p>
      <p>Author’s note:</p>
      <p>
        This puzzle was inspired by the Barbenheimer phenomenon of 2023 and the
        observation that both movies could be vaguely described as “a story
        about a man and his love of the bombshell”.
      </p>
      <p>
        The title XOXO has a surface reading of “love” but also cryptically
        clues X = cross, O = Oscar (NATO).
      </p>
    </>
  );
};

export default Solution;
