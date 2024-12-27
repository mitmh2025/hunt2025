import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import { PuzzleAnswer } from "../../components/StyledUI";
import img1 from "./assets/solution1.png";
import img2 from "./assets/solution2.png";
import { orderedImages } from "./puzzle";

const tableContents: [
  string,
  string,
  number,
  string,
  string,
  string,
  string,
][] = [
  [
    "1938",
    "Winner",
    22,
    "Animals of the Bible",
    "Dorothy P. Lathrop",
    "https://en.wikipedia.org/wiki/Animals_of_the_Bible",
    "https://en.wikipedia.org/wiki/Dorothy_P._Lathrop",
  ],
  [
    "1939",
    "Winner",
    36,
    "Mei Li",
    "Thomas Handforth",
    "https://en.wikipedia.org/wiki/Mei_Li",
    "https://en.wikipedia.org/wiki/Thomas_Handforth",
  ],
  [
    "1940",
    "Winner",
    41,
    "Abraham Lincoln",
    "Ingri and Edgar Parin d’Aulaire",
    "https://en.wikipedia.org/wiki/Abraham_Lincoln_(Parin_d%27Aulaire_book)",
    "https://en.wikipedia.org/wiki/Ingri_and_Edgar_Parin_d%27Aulaire",
  ],
  [
    "1941",
    "Winner",
    39,
    "They Were Strong and Good",
    "Robert Lawson",
    "https://en.wikipedia.org/wiki/They_Were_Strong_and_Good",
    "https://en.wikipedia.org/wiki/Robert_Lawson_(author)",
  ],
  [
    "1942",
    "Winner",
    38,
    "Make Way for Ducklings",
    "Robert McCloskey",
    "https://en.wikipedia.org/wiki/Make_Way_for_Ducklings",
    "https://en.wikipedia.org/wiki/Robert_McCloskey",
  ],
  [
    "1943",
    "Winner",
    19,
    "The Little House",
    "Virginia Lee Burton",
    "https://en.wikipedia.org/wiki/The_Little_House",
    "https://en.wikipedia.org/wiki/Virginia_Lee_Burton",
  ],
  [
    "1944",
    "Winner",
    9,
    "Many Moons",
    "Louis Slobodkin",
    "https://en.wikipedia.org/wiki/Many_Moons",
    "https://en.wikipedia.org/wiki/Louis_Slobodkin",
  ],
  [
    "1945",
    "Winner",
    4,
    "Prayer for a Child",
    "Elizabeth Orton Jones",
    "https://en.wikipedia.org/wiki/Prayer_for_a_Child",
    "https://en.wikipedia.org/wiki/Elizabeth_Orton_Jones",
  ],
  [
    "1946",
    "Winner",
    5,
    "The Rooster Crows",
    "Maud and Miska Petersham",
    "https://en.wikipedia.org/wiki/The_Rooster_Crows",
    "https://en.wikipedia.org/wiki/Maud_and_Miska_Petersham",
  ],
  [
    "1947",
    "Winner",
    14,
    "The Little Island",
    "Leonard Weisgard",
    "https://en.wikipedia.org/wiki/The_Little_Island_(book)",
    "https://en.wikipedia.org/wiki/Leonard_Weisgard",
  ],
  [
    "1948",
    "Winner",
    17,
    "White Snow, Bright Snow",
    "Roger Duvoisin",
    "https://en.wikipedia.org/wiki/White_Snow,_Bright_Snow",
    "https://en.wikipedia.org/wiki/Roger_Duvoisin",
  ],
  [
    "1949",
    "Winner",
    15,
    "The Big Snow",
    "Berta and Elmer Hader",
    "https://en.wikipedia.org/wiki/The_Big_Snow",
    "https://en.wikipedia.org/wiki/Berta_and_Elmer_Hader",
  ],
  [
    "1950",
    "Winner",
    31,
    "Song of the Swallows",
    "Leo Politi",
    "https://en.wikipedia.org/wiki/Song_of_the_Swallows",
    "https://en.wikipedia.org/wiki/Leo_Politi",
  ],
  [
    "1951",
    "Winner",
    51,
    "The Egg Tree",
    "Katherine Milhous",
    "https://en.wikipedia.org/wiki/The_Egg_Tree",
    "https://en.wikipedia.org/wiki/Katherine_Milhous",
  ],
  [
    "1952",
    "Winner",
    42,
    "Finders Keepers",
    "Nicholas Mordvinoff",
    "https://en.wikipedia.org/wiki/Finders_Keepers_(Will_and_Nicholas_children%27s_book)",
    "https://en.wikipedia.org/wiki/Nicholas_Mordvinoff",
  ],
  [
    "1946",
    "Honor",
    7,
    "You Can Write Chinese",
    "Kurt Wiese",
    "https://en.wikipedia.org/wiki/You_Can_Write_Chinese",
    "https://en.wikipedia.org/wiki/Kurt_Wiese",
  ],
  [
    "1947",
    "Honor",
    2,
    "Timothy Turtle",
    "Tony Palazzo",
    "https://en.wikipedia.org/wiki/Timothy_Turtle",
    "https://en.wikipedia.org/wiki/Tony_Palazzo",
  ],
  [
    "1948",
    "Honor",
    1,
    "Stone Soup",
    "Marcia Brown",
    "https://en.wikipedia.org/wiki/Stone_Soup#Literature",
    "https://en.wikipedia.org/wiki/Marcia_Brown",
  ],
  [
    "1949",
    "Honor",
    3,
    "Blueberries for Sal",
    "Robert McCloskey",
    "https://en.wikipedia.org/wiki/Blueberries_for_Sal",
    "https://en.wikipedia.org/wiki/Robert_McCloskey",
  ],
  [
    "1950",
    "Honor",
    13,
    "Bartholomew and the Oobleck",
    "Dr. Seuss",
    "https://en.wikipedia.org/wiki/Bartholomew_and_the_Oobleck",
    "https://en.wikipedia.org/wiki/Dr._Seuss",
  ],
  [
    "1974",
    "Honor",
    47,
    "Cathedral",
    "David Macaulay",
    "https://en.wikipedia.org/wiki/Cathedral_(children%27s_book)",
    "https://en.wikipedia.org/wiki/David_Macaulay",
  ],
  [
    "1975",
    "Honor",
    49,
    "Jambo Means Hello: Swahili Alphabet Book",
    "Tom Feelings",
    "https://en.wikipedia.org/wiki/Jambo_Means_Hello:_A_Swahili_Alphabet_Book",
    "https://en.wikipedia.org/wiki/Tom_Feelings",
  ],
  [
    "1976",
    "Honor",
    48,
    "Strega Nona",
    "Tomie dePaola",
    "https://en.wikipedia.org/wiki/Strega_Nona",
    "https://en.wikipedia.org/wiki/Tomie_dePaola",
  ],
  [
    "1977",
    "Honor",
    30,
    "The Amazing Bone",
    "William Steig",
    "https://en.wikipedia.org/wiki/The_Amazing_Bone",
    "https://en.wikipedia.org/wiki/William_Steig",
  ],
  [
    "1979",
    "Honor",
    23,
    "Freight Train",
    "Donald Crews",
    "https://en.wikipedia.org/wiki/Freight_Train_(book)",
    "https://en.wikipedia.org/wiki/Donald_Crews",
  ],
  [
    "1980",
    "Honor",
    10,
    "The Garden of Abdul Gasazi",
    "Chris Van Allsburg",
    "https://en.wikipedia.org/wiki/The_Garden_of_Abdul_Gasazi",
    "https://en.wikipedia.org/wiki/Chris_Van_Allsburg",
  ],
  [
    "1981",
    "Honor",
    8,
    "The Grey Lady and the Strawberry Snatcher",
    "Molly Bang",
    "https://en.wikipedia.org/wiki/The_Grey_Lady_and_the_Strawberry_Snatcher",
    "https://en.wikipedia.org/wiki/Molly_Bang",
  ],
  [
    "1982",
    "Honor",
    6,
    "A Visit to William Blake’s Inn: Poems for Innocent and Experienced Travelers",
    "Alice and Martin Provensen",
    "https://en.wikipedia.org/wiki/A_Visit_to_William_Blake%27s_Inn:_Poems_for_Innocent_and_Experienced_Travelers",
    "https://en.wikipedia.org/wiki/Alice_and_Martin_Provensen",
  ],
  [
    "1983",
    "Honor",
    18,
    "A Chair for My Mother",
    "Vera B. Williams",
    "https://en.wikipedia.org/wiki/A_Chair_for_My_Mother",
    "https://en.wikipedia.org/wiki/Vera_B._Williams",
  ],
  [
    "1984",
    "Honor",
    21,
    "Little Red Riding Hood",
    "Trina Schart Hyman",
    "https://en.wikipedia.org/wiki/Little_Red_Riding_Hood",
    "https://en.wikipedia.org/wiki/Trina_Schart_Hyman",
  ],
  [
    "1985",
    "Honor",
    35,
    "The Story of Jumping Mouse: A Native American Legend",
    "John Steptoe",
    "https://en.wikipedia.org/wiki/The_Story_of_Jumping_Mouse:_A_Native_American_Legend",
    "https://en.wikipedia.org/wiki/John_Steptoe",
  ],
  [
    "1986",
    "Honor",
    25,
    "King Bidgood’s in the Bathtub",
    "Don Wood",
    "https://en.wikipedia.org/wiki/King_Bidgood%27s_in_the_Bathtub",
    "https://en.wikipedia.org/wiki/Don_Wood",
  ],
  [
    "1987",
    "Honor",
    26,
    "Rumpelstiltskin",
    "Paul O. Zelinsky",
    "https://en.wikipedia.org/wiki/Rumpelstiltskin",
    "https://en.wikipedia.org/wiki/Paul_O._Zelinsky",
  ],
  [
    "1998",
    "Honor",
    37,
    "The Gardener",
    "David Small",
    "https://en.wikipedia.org/wiki/The_Gardener_(book)",
    "https://en.wikipedia.org/wiki/David_Small",
  ],
  [
    "1999",
    "Honor",
    40,
    "Duke Ellington: The Piano Prince and His Orchestra",
    "Brian Pinkney",
    "https://en.wikipedia.org/wiki/Duke_Ellington:_The_Piano_Prince_and_His_Orchestra",
    "https://en.wikipedia.org/wiki/Brian_Pinkney",
  ],
  [
    "2000",
    "Honor",
    53,
    "Sector 7",
    "David Wiesner",
    "https://en.wikipedia.org/wiki/Sector_7_(book)",
    "https://en.wikipedia.org/wiki/David_Wiesner",
  ],
  [
    "2001",
    "Honor",
    52,
    "Olivia",
    "Ian Falconer",
    "https://en.wikipedia.org/wiki/Olivia_(picture_book)",
    "https://en.wikipedia.org/wiki/Ian_Falconer",
  ],
  [
    "2004",
    "Honor",
    34,
    "Don’t Let the Pigeon Drive the Bus!",
    "Mo Willems",
    "https://en.wikipedia.org/wiki/Don%27t_Let_the_Pigeon_Drive_the_Bus!",
    "https://en.wikipedia.org/wiki/Mo_Willems",
  ],
  [
    "2005",
    "Honor",
    44,
    "The Red Book",
    "Barbara Lehman",
    "https://en.wikipedia.org/wiki/The_Red_Book_(children%27s_book)",
    "https://en.wikipedia.org/wiki/Barbara_Lehman",
  ],
  [
    "2006",
    "Honor",
    43,
    "Zen Shorts",
    "Jon J. Muth",
    "https://en.wikipedia.org/wiki/Zen_Shorts",
    "https://en.wikipedia.org/wiki/Jon_J._Muth",
  ],
  [
    "2007",
    "Honor",
    50,
    "Gone Wild: An Endangered Animal Alphabet",
    "David McLimans",
    "https://en.wikipedia.org/wiki/Gone_Wild:_An_Endangered_Animal_Alphabet",
    "https://en.wikipedia.org/wiki/David_McLimans",
  ],
  [
    "2008",
    "Honor",
    46,
    "First the Egg",
    "Laura Vaccaro Seeger",
    "https://en.wikipedia.org/wiki/First_the_Egg",
    "https://en.wikipedia.org/wiki/Laura_Vaccaro_Seeger",
  ],
  [
    "2009",
    "Honor",
    45,
    "How I Learned Geography",
    "Uri Shulevitz",
    "https://en.wikipedia.org/wiki/How_I_Learned_Geography",
    "https://en.wikipedia.org/wiki/Uri_Shulevitz",
  ],
  [
    "2010",
    "Honor",
    33,
    "All the World",
    "Marla Frazee",
    "https://en.wikipedia.org/wiki/All_the_World",
    "https://en.wikipedia.org/wiki/Marla_Frazee",
  ],
  [
    "2015",
    "Honor",
    24,
    "Sam and Dave Dig a Hole",
    "Jon Klassen",
    "https://en.wikipedia.org/wiki/Sam_and_Dave_Dig_a_Hole",
    "https://en.wikipedia.org/wiki/Jon_Klassen",
  ],
  [
    "2016",
    "Honor",
    11,
    "Waiting",
    "Kevin Henkes",
    "https://en.wikipedia.org/wiki/Waiting_(picture_book)",
    "https://en.wikipedia.org/wiki/Kevin_Henkes",
  ],
  [
    "2017",
    "Honor",
    12,
    "They All Saw a Cat",
    "Brendan Wenzel",
    "https://en.wikipedia.org/wiki/They_All_Saw_a_Cat",
    "https://en.wikipedia.org/wiki/Brendan_Wenzel",
  ],
  [
    "2018",
    "Honor",
    16,
    "A Different Pond",
    "Thi Bui",
    "https://en.wikipedia.org/wiki/A_Different_Pond",
    "https://en.wikipedia.org/wiki/Thi_Bui",
  ],
  [
    "2019",
    "Honor",
    20,
    "A Big Mooncake for Little Star",
    "Grace Lin",
    "https://en.wikipedia.org/wiki/A_Big_Mooncake_for_Little_Star",
    "https://en.wikipedia.org/wiki/Grace_Lin",
  ],
  [
    "2020",
    "Honor",
    29,
    "Going Down Home with Daddy",
    "Daniel Minter",
    "https://en.wikipedia.org/wiki/Going_Down_Home_with_Daddy",
    "https://en.wikipedia.org/wiki/Daniel_Minter",
  ],
  [
    "2021",
    "Honor",
    32,
    "The Cat Man of Aleppo",
    "Yuko Shimizu",
    "https://en.wikipedia.org/wiki/The_Cat_Man_of_Aleppo",
    "https://en.wikipedia.org/wiki/Yuko_Shimizu_(illustrator)",
  ],
  [
    "2022",
    "Honor",
    28,
    "Have You Ever Seen a Flower?",
    "Shawn Harris",
    "https://en.wikipedia.org/wiki/Have_You_Ever_Seen_a_Flower%3F",
    "https://en.wikipedia.org/wiki/Shawn_Harris_(illustrator)",
  ],
  [
    "2023",
    "Honor",
    27,
    "Knight Owl",
    "Christopher Denise",
    "https://en.wikipedia.org/wiki/Knight_Owl_(book)",
    "https://en.wikipedia.org/wiki/Christopher_Denise",
  ],
];

const StyledTable = styled.table`
    border-collapse: collapse;
    margin-left: auto;
    margin-right: auto;

    td {
        border: 1px solid black;
        padding: 1rem;
        text-align: center;
    }
}
`;

const SolutionTable = () => {
  return (
    <StyledTable>
      <tr>
        <th>Year</th>
        <th>Award</th>
        <th>Dot Number</th>
        <th>Picture</th>
        <th>Book Title</th>
        <th>Author</th>
      </tr>
      {tableContents.map((line, index) => {
        const [year, award, dotNumber, title, author, titleLink, authorLink] =
          line;
        return (
          <tr key={index}>
            <td>{year}</td>
            <td>{award}</td>
            <td>{dotNumber}</td>
            <td>
              <LinkedImage src={orderedImages[dotNumber - 1] ?? ""} alt="" />
            </td>
            <td>
              <a href={titleLink} target="_blank" rel="noreferrer">
                {title}
              </a>
            </td>
            <td>
              <a href={authorLink} target="_blank" rel="noreferrer">
                {author}
              </a>
            </td>
          </tr>
        );
      })}
    </StyledTable>
  );
};

const Solution = () => {
  return (
    <>
      <p>
        This puzzle consists of a connect-the-dots puzzle, with a corresponding
        image for each dot. These dots are all cropped from children’s book
        covers that either won the Caldecott medal or were Caldecott honorees.
      </p>
      <p>
        As suggested by the flavortext (“the winner’s circle has gotten jumbled”
        and “careful sorting”), solvers must separate out the medalists from the
        honorees, which results in two pictures. Identifying the Caldecott
        medal-winning books, solvers will see that they were winners in
        consecutive years (see full identification in the chart below).
        Connecting the dots in this corresponding order draws the first picture.
      </p>
      <img src={img1} alt="Connect-the-dots solution showing a bird" />
      <p>
        Identifying the honorees, solvers will see that there are several runs
        of consecutive years represented. Connecting the dots for consecutive
        year runs creates several lines, resulting in the second picture.
      </p>
      <img src={img2} alt="Connect-the-dots solution showing an orchid" />
      <p>
        These two pictures give the answer{" "}
        <PuzzleAnswer>BIRD ORCHID</PuzzleAnswer>, matching the blanks given at
        the bottom of the puzzle.
      </p>
      <p>
        The full list of Caldecott medal winners and honorees is as follows:
      </p>
      <SolutionTable />
    </>
  );
};

export default Solution;
