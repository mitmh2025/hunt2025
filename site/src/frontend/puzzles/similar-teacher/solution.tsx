import React from "react";
import { styled } from "styled-components";
import { Mono, PuzzleAnswer } from "../../components/StyledUI";

const StyledTable = styled.table`
  border-collapse: collapse;
  td,
  th {
    padding: 1px 8px;
    border: 1px solid var(--black);
  }
  tr.first-of-ladder {
    border-top: 2px solid var(--black);
  }
  tr.highlight {
    background-color: #a1bcbb;
  }
`;

const LADDERS: {
  ingredients: string;
  name: string;
  clue: string | null;
}[][] = [
  [
    {
      ingredients: "Dry vermouth, Bénédictine, Absinthe",
      name: "Chrysanthemum",
      clue: "Flower often associated with death (13)",
    },
    {
      ingredients: "Gin, Dry vermouth, Absinthe",
      name: "Obituary [Cocktail]",
      clue: null,
    },
    {
      ingredients: "Gin, Absinthe, Orgeat",
      name: "Gaby des Lys",
      clue: "Triple-threat actress with a flowery name, known for Her Triumph (4 3 3, orig. 4 6)",
    },
    {
      ingredients: "Gin, Orgeat, Lemon juice",
      name: "Army & Navy",
      clue: "Combatants in an annual football game (4 & 4)",
    },
    {
      ingredients: "Gin, Honey syrup, Lemon juice",
      name: "Bee’s Knees",
      clue: "Insect’s Joints (3’1 5)",
    },
    {
      ingredients: "Bourbon, Honey syrup, Lemon juice",
      name: "Gold Rush",
      clue: "Opportunity to sell picks and shovels (4 4)",
    },
    {
      ingredients: "Bourbon, Amaro, Lemon juice",
      name: "Campfire Sour",
      clue: "S’more made with gummy worms? (8 4)",
    },
    {
      ingredients: "Bourbon, Amaro, Blackberry syrup",
      name: "Painted Black",
      clue: "How Mick Jagger would prefer his red door (7 5)",
    },
  ],
  [
    {
      ingredients: "Brandy, Rum, Triple sec, Lemon juice",
      name: "Between the Sheets",
      clue: "Foreplay by fOURPLAY (7 3 6)",
    },
    {
      ingredients: "Brandy, Triple sec, Aromatized wine, Lemon juice",
      name: "Hoop La",
      clue: "Basketball circle in Southern California? (4 2, orig. 6)",
    },
    {
      ingredients: "Cognac, Triple sec, Aromatized wine, Lemon juice",
      name: "Crux",
      clue: null,
    },
    {
      ingredients: "Cognac, Amaro Montenegro, Aromatized wine, Lemon juice",
      name: "Hurly-Burly",
      clue: "Raucous activity (5-5)",
    },
  ],
  [
    {
      ingredients: "Irish whiskey, Red wine, Lemon juice, Simple syrup",
      name: "Gangs of New York Sour",
      clue: "Change your mind about a Daniel Day-Lewis movie? (5 2 3 4 4)",
    },
    {
      ingredients: "Irish whiskey, Swedish Punsch, Lemon juice, Simple syrup",
      name: "Mrs. Doyle",
      clue: "Father Ted’s housekeeper (3. 5)",
    },
    {
      ingredients: "Cognac, Swedish Punsch, Lemon juice, Simple syrup",
      name: "Maybach",
      clue: null,
    },
    {
      ingredients: "Cognac, Orange bitters, Lemon juice, Simple syrup",
      name: "LeMons",
      clue: "A 24 hour race through citrus fields? (6, orig. 2 4)",
    },
    {
      ingredients: "Bourbon, Orange bitters, Lemon juice, Simple syrup",
      name: "Buster Brown",
      clue: "Tige’s human (6 5)",
    },
    {
      ingredients: "Bourbon, Orange bitters, Lemon juice, Honey syrup",
      name: "Blind Lemon Jefferson",
      clue: "Sightless blues singer with a thematically appropriate name (5 5 9)",
    },
    {
      ingredients: "Bourbon, Peach liqueur, Lemon juice, Honey syrup",
      name: "Democrat",
      clue: "One who votes (8)",
    },
  ],
  [
    {
      ingredients: "Gin, Absinthe, Simple syrup, Lime juice, Mint",
      name: "French Pearl",
      clue: "Le trésor d’une huître (6 5)",
    },
    {
      ingredients: "Gin, Lime juice, Simple syrup, Cucumber, Mint",
      name: "East Side [Cocktail]",
      clue: "The edge that sees the sunrise (4 4 [8])",
    },
    {
      ingredients: "Bourbon, Lime juice, Simple syrup, Cucumber, Mint",
      name: "Kentucky Maid",
      clue: "Housekeeper in Louisville (8 4)",
    },
    {
      ingredients: "Bourbon, Bitters, Lime juice, Simple syrup, Mint",
      name: "Ex-Pat",
      clue: null,
    },
    {
      ingredients: "Demerara Rum, Bitters, Lime juice, Simple syrup, Mint",
      name: "Queen’s Park Swizzle",
      clue: "Mixup occurring between Kensal Town and Willesden? (5’1 4 7)",
    },
  ],
  [
    {
      ingredients: "Gin, Maraschino Liqueur, Herbal liqueur, Lime juice",
      name: "Last Word",
      clue: "Just “Brute”, no “Et tu” (4 4)",
    },
    {
      ingredients: "Mezcal, Maraschino Liqueur, Herbal liqueur, Lime juice",
      name: "[The] Last Stand",
      clue: "What’s made on the hill you die on ([3] 4 5)",
    },
    {
      ingredients: "Mezcal, Herbal liqueur, Aperol, Lime juice",
      name: "Naked and Famous",
      clue: "Description of a streaking celebrity (5 3 6)",
    },
    {
      ingredients: "Aquavit, Herbal liqueur, Aperol, Lime juice",
      name: "Litigious Rock",
      clue: "Granite that will sue you (9 4)",
    },
    {
      ingredients: "Aquavit, Aperol, Lime juice, Orgeat",
      name: "[The] Kung Fu",
      clue: null,
    },
    {
      ingredients: "Blanco tequila, Aperol, Lime juice, Orgeat",
      name: "Dead Man’s Handle",
      clue: "How you open a well-known pirate chest? (4 3’1 6)",
    },
  ],
  [
    {
      ingredients:
        "Amontillado Sherry, Dry vermouth, Orange bitters, Bitters, Lemon peel",
      name: "Bamboo",
      clue: "Eats; shoots and leaves? (6)",
    },
    {
      ingredients:
        "Amontillado Sherry, Dry vermouth, Bénédictine, Orange bitters, Lemon peel",
      name: "Bamboo Monk",
      clue: "A panda at #3 (6 4)",
    },
    {
      ingredients: "Gin, Dry vermouth, Orange bitters, Bénédictine, Lemon peel",
      name: "Poet’s Dream",
      clue: "A fantasy for Poe or Hughes (4’1 5)",
    },
    {
      ingredients:
        "Gin, Dry vermouth, Cherry Liqueur, Orange bitters, Lemon peel",
      name: "Girly-O",
      clue: null,
    },
    {
      ingredients:
        "Gin, Cherry Liqueur, Dry vermouth, Orange bitters, Lemon juice",
      name: "Elephants Sometimes Forget",
      clue: "A pithy observation on Proboscideans going contrary to popular belief (9 9 6)",
    },
    {
      ingredients:
        "Rye, Cherry Liqueur, Dry vermouth, Orange bitters, Lemon juice",
      name: "La Perique",
      clue: "The distinctive pipe tobacco from Louisiana (2 7)",
    },
  ],
  [
    {
      ingredients: "Gin, Dry vermouth, Sweet vermouth, Mint",
      name: "Cooperstown",
      clue: "Home of a sports hall of fame (11)",
    },
    {
      ingredients: "Gin, Sweet vermouth, Absinthe, Mint",
      name: "Harry’s [Cocktail]",
      clue: "Belonging to Mr Styles (5’1 [8])",
    },
    {
      ingredients: "Gin, Sweet vermouth, Absinthe, Lemon peel",
      name: "Fourth Degree",
      clue: "Person just over halfway to Kevin Bacon (6 6)",
    },
    {
      ingredients: "Gin, Sweet vermouth, Herbal liqueur, Lemon peel",
      name: "[The] San Martin",
      clue: "South American liberator ([3] 3 6)",
    },
    {
      ingredients: "Gin, Aromatized wine, Herbal liqueur, Lemon peel",
      name: "Zephyr",
      clue: "Gentle breeze delivering home one on an Odyssey (6)",
    },
    {
      ingredients: "Gin, Aromatized wine, Maraschino Liqueur, Lemon peel",
      name: "La Parie",
      clue: null,
    },
    {
      ingredients: "Gin, Pineau des Charentes, Maraschino Liqueur, Lemon peel",
      name: "[The] Cappa",
      clue: "Black cloak worn by a Dominican friar ([3] 5)",
    },
  ],
  [
    {
      ingredients: "Gin, Eau de vie of Douglas Fir, Blackberry Juice",
      name: "Single Father’s Day",
      clue: "Third Sunday in June for divorcés (6 6’1 3)",
    },
    {
      ingredients: "Gin, Eau de vie of Douglas Fir, Herbal liqueur",
      name: "Alaska Forest",
      clue: "Chugach or Tongass, for instance (6 6)",
    },
    {
      ingredients: "Gin, Bénédictine, Herbal liqueur",
      name: "Louis Special",
      clue: "Only on tonight’s menu, named after Satchmo (5 7)",
    },
    {
      ingredients: "Rye, Bénédictine, Herbal liqueur",
      name: "Purgatory",
      clue: null,
    },
    {
      ingredients: "Rye, Sweet vermouth, Bénédictine",
      name: "[The] Heim Lick",
      clue: "Save someone from choking with your tongue? ([3] 4 4)",
    },
    {
      ingredients: "Sweet vermouth, Bénédictine, Bitters",
      name: "Monastery [Cocktail]",
      clue: "A classic brewery? (9 [8])",
    },
    {
      ingredients: "Fernet Branca, Sweet vermouth, Bitters",
      name: "Winter Digestive",
      clue: "McVitie’s biscuit eaten when it’s cold? (6 9)",
    },
    {
      ingredients: "Sweet vermouth, Fernet Branca, Orange bitters",
      name: "Miseria [Cocktail]",
      clue: "Ciò che ama la compagnia (7 [8])",
    },
    {
      ingredients: "Dry sherry, Sweet vermouth, Orange bitters",
      name: "Adonis",
      clue: "Lover of Venus (6)",
    },
  ],
  [
    {
      ingredients: "Gin, Triple sec, Lemon juice, Orange juice",
      name: "Maiden’s Prayer",
      clue: "Plea from a damsel (6’1 6)",
    },
    {
      ingredients: "Gin, Triple sec, Lemon juice, Egg white",
      name: "White Lady",
      clue: null,
    },
    {
      ingredients: "Gin, Elderflower liqueur, Lemon juice, Egg white",
      name: "Mademoiselle",
      clue: "A young lady in Paris (12)",
    },
    {
      ingredients: "Gin, Crème de Violette, Elderflower liqueur, Lemon juice",
      name: "Charlie Tango",
      clue: "NATO’s Connecticut (7 5)",
    },
    {
      ingredients: "Gin, Maraschino Liqueur, Crème de Violette, Lemon juice",
      name: "Aviation [Cocktail]",
      clue: "Sully’s area of expertise (8 [8])",
    },
    {
      ingredients: "Rye, Maraschino Liqueur, Lemon juice, Crème de Violette",
      name: "[The] Radiation",
      clue: "Energetic emission ([3] 9)",
    },
    {
      ingredients: "Rye, Maraschino Liqueur, Lemon juice, Maraschino cherry",
      name: "Tennessee",
      clue: "Home to Elvis and Dolly (9)",
    },
    {
      ingredients: "Rye, Sweet vermouth, Maraschino Liqueur, Maraschino cherry",
      name: "Red Hook",
      clue: "Brooklyn neighborhood (3 4)",
    },
    {
      ingredients: "Rye, Sweet vermouth, Cynar, Maraschino cherry",
      name: "Little Italy",
      clue: "Ethnic neighborhood in many cities that makes a good tongue twister (6 5)",
    },
  ],
  [
    {
      ingredients: "Gin, Bitters, Honey syrup, Lime juice",
      name: "Fig Bee’s Knees",
      clue: "#33 with a wasp inside (3 3’1 5)",
    },
    {
      ingredients: "Gin, Dry vermouth, Bitters, Honey syrup",
      name: "#42",
      clue: "Answer to the Ultimate Question (#2)",
    },
    {
      ingredients: "Gin, Dry vermouth, Bénédictine, Bitters",
      name: "Cabaret",
      clue: "An adult show or a Broadway musical (7)",
    },
    {
      ingredients: "Dry vermouth, Bénédictine, Bitters, Lemon peel",
      name: "Tip Top",
      clue: null,
    },
    {
      ingredients: "Scotch, Bénédictine, Bitters, Lemon peel",
      name: "Highlander [Cocktail]",
      clue: "There can be only one (10 [8])",
    },
    {
      ingredients: "Scotch, Sweet vermouth, Bénédictine, Lemon peel",
      name: "Bobby Burns",
      clue: "Diminutive nickname for a Scottish Poet (5 5)",
    },
  ],
];

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This is a cocktail ladder puzzle, playing on the fact that many
        cocktails can have one ingredient swapped to become another drink
        entirely.
      </p>
      <p>
        The first thing solvers may notice is that the crossword clues given
        resolve to named cocktails. Some of these - such as Bee’s Knees, Naked &
        Famous, and Gold Rush - are more well-known than others. Comparing these
        to lists of cocktails may help with completing the crossword clues.
        Solvers will also note that cocktails using articles (“the”) or the word
        “cocktail” have those enumerated in brackets, and not included in the
        clue, indicating those words are extraneous.
      </p>
      <p>
        The second thing solvers may notice is that there can be variation in
        the recipes for these cocktails across various sources. However, all of
        these cocktails (including the more obscure) are represented on the
        mixology website “Kindred Cocktails”, which the puzzle title also
        alludes to. This acts as a canonical data-set for ingredients.
      </p>
      <p>
        The next thing to notice are the ladders below, each of which has two
        cocktails placed already. These ladders can be mostly filled in, but not
        entirely. Counting the number of ladder components and clued cocktails
        will lead solvers to notice that 10 cocktails are missing, probably one
        from each ladder.
      </p>
      <p>
        Completing the ladders based on ingredients swapped will allow solvers
        to find the missing cocktails. The final thing to notice is that the
        length of each ladder matches the length of the missing cocktail’s name.
        Indexing into the cocktail name by position in the ladder gives a
        letter, spelling out in given order <Mono>BUY A FLIGHT</Mono>. Solvers
        must then visit the Gala to order a flight.
      </p>
      <p>
        After ordering their Flight, solvers are given 6 bottles of mixed drinks
        with 3 ingredients each, as well as a menu listing ingredients.
        Identifying the ingredients in each drink by taste, and using their
        first letters, allows solvers to spell a 3-letter word (this does
        require anagramming, because after all they are mixed drinks). Between
        each drink, 1 letter is changed (1 ingredient swapped), and looking at
        the changed letter in order spells the final answer,{" "}
        <PuzzleAnswer>FLYER</PuzzleAnswer>. The full list of drinks and their
        ingredients is also below.
      </p>
      <h3>Full Cocktail Ladder Listing</h3>
      <StyledTable>
        <tr>
          <th>Ladder</th>
          <th>Ingredients</th>
          <th>Cocktail [solution]</th>
          <th>Full Clue</th>
        </tr>
        {LADDERS.map((ladder, i) =>
          ladder.map((cocktail, j) => {
            const classNames: string[] = [];
            if (cocktail.clue === null) {
              classNames.push("highlight");
            }
            if (j === 0) {
              classNames.push("first-of-ladder");
            }
            return (
              <tr key={`${i}-${j}`} className={classNames.join(" ")}>
                <td>{i + 1}</td>
                <td>{cocktail.ingredients}</td>
                <td>{cocktail.name}</td>
                <td>{cocktail.clue ?? ""}</td>
              </tr>
            );
          }),
        )}
      </StyledTable>
      <h3>Drinks in the Flight</h3>
      <StyledTable>
        <tr>
          <td>Elderberry, Lime Juice, Fig Jam</td>
          <td>ELF</td>
        </tr>
        <tr>
          <td colSpan={2}>
            <strong>F</strong>ig Jam→Yogurt
          </td>
        </tr>
        <tr>
          <td>Lime Juice, Yogurt, Elderberry</td>
          <td>LYE</td>
        </tr>
        <tr>
          <td colSpan={2}>
            <strong>L</strong>ime Juice→Apple Juice
          </td>
        </tr>
        <tr>
          <td>Apple Juice, Yogurt, Elderberry</td>
          <td>AYE</td>
        </tr>
        <tr>
          <td colSpan={2}>
            <strong>Y</strong>ogurt→Rose Water
          </td>
        </tr>
        <tr>
          <td>Elderberry, Apple Juice, Rose Water</td>
          <td>EAR</td>
        </tr>
        <tr>
          <td colSpan={2}>
            <strong>E</strong>lderberry→Instant Coffee
          </td>
        </tr>
        <tr>
          <td>Apple Juice, Instant Coffee, Rose Water</td>
          <td>AIR</td>
        </tr>
        <tr>
          <td colSpan={2}>
            <strong>R</strong>ose Water→Dill
          </td>
        </tr>
        <tr>
          <td>Apple Juice, Instant Coffee, Dill</td>
          <td>AID</td>
        </tr>
      </StyledTable>
    </>
  );
};

export default Solution;
