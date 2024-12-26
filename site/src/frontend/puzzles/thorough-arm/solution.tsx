import React from "react";
import { styled } from "styled-components";

const StyledTable = styled.table`
  margin: 1em 0;
  border-spacing: 16px 0px;
`;

const DATA = [
  {
    name: "Gracie",
    adventurerClass: "Monk",
    brand: "ARWEN’S",
    drink: "Ale",
    epithet: "fluid",
    transform: "unique anagram of name",
    transformed: "ANSWER",
    numDrinks: 13,
    order: 1,
  },
  {
    name: "Oliver",
    adventurerClass: "Rogue",
    brand: "GLIGO",
    drink: "Gin",
    epithet: "shifty",
    transform: "unique Caesar shift of name",
    transformed: "CHECK",
    numDrinks: 7,
    order: 2,
  },
  {
    name: "Patrick",
    adventurerClass: "Wizard",
    brand: "TRAVENO",
    drink: "Tequila",
    epithet: "familiar flapped away",
    transform: "remove RAVEN from name",
    transformed: "TO",
    numDrinks: 12,
    order: 3,
  },
  {
    name: "Alison",
    adventurerClass: "Sorcerer",
    brand: "REFLIP",
    drink: "Rye",
    epithet: "self-reflective",
    transform: "reverse name",
    transformed: "PILFER",
    numDrinks: 5,
    order: 4,
  },
  {
    name: "Yaron",
    adventurerClass: "Bard",
    brand: "VIBRATING",
    drink: "Vodka",
    epithet: "keeps notes",
    transform: "filter letters of name to ABCDEFG",
    transformed: "BAG",
    numDrinks: 8,
    order: 5,
  },
  {
    name: "Tabitha",
    adventurerClass: "Paladin",
    brand: "FORTY-NINER",
    drink: "Fernet",
    epithet: "rooting out evil",
    transform: "square-root of number in name",
    transformed: "SEVEN",
    numDrinks: 9,
    order: 6,
  },
  {
    name: "August",
    adventurerClass: "Artificer",
    brand: "WOOLLY",
    drink: "Wine",
    epithet: "holey",
    transform: "number of closed loops in name",
    transformed: "TWO",
    numDrinks: 21,
    order: 7,
  },
  {
    name: "Bill",
    adventurerClass: "Fighter",
    brand: "METAFOUR",
    drink: "Mead",
    epithet: "cleaves things in twain",
    transform: "take one contiguous half of name",
    transformed: "FOUR",
    numDrinks: 15,
    order: 8,
  },
];

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        This puzzle is presented as a dialogue between a group of hungover
        Dungeons and Dragons style adventurers snarking each other for their
        shenanigans during the previous night of revelry. From these statements,
        we can determine which adventurer is of which class, how many drinks
        each adventurer had, what they were drinking, and in what order they
        passed out.
      </p>
      <p>
        A full solve path for this logic can be found at the end of this page.
        The final outcome is:
      </p>
      <StyledTable>
        <tr>
          <th>Name</th>
          <th>Class</th>
          <th>Drink</th>
          <th># Drinks</th>
          <th>Order</th>
        </tr>
        {DATA.map(({ name, adventurerClass, drink, numDrinks, order }) => (
          <tr key={order}>
            <td>{name}</td>
            <td>{adventurerClass}</td>
            <td>{drink}</td>
            <td>{numDrinks}</td>
            <td>{order}</td>
          </tr>
        ))}
      </StyledTable>
      <p>
        When the adventurers’ names are ordered in the order they passed out,
        the first letters spell <code>GO PAY TAB</code>. Upon submitting this
        answer, solvers are instructed to send a representative to the Gala in
        order to do so. There, the bartender hands them a receipt listing all
        the drinks ordered by the adventurers.
      </p>
      <p>
        Each line item on the receipt is given as the drink’s brand name, with a
        price of 20.25 gold pieces per pour. The drink brand names start with
        the same unique set of first letters as the types of drinks. Solvers can
        assume a correlation between brand name and adventurer drink type from
        this. As additional pieces of confirmatory data, the quantity of each
        drink on the receipt corresponds with the amount of drinks the correct
        adventurer had, and each drink stops appearing in the receipt in the
        order in which their adventurer passes out.
      </p>
      <StyledTable>
        <tr>
          <th>Name</th>
          <th>Class</th>
          <th>Brand</th>
          <th>Drink</th>
          <th># Drinks</th>
          <th>Order</th>
        </tr>
        {DATA.map(
          ({ name, adventurerClass, brand, drink, numDrinks, order }) => (
            <tr key={order}>
              <td>{name}</td>
              <td>{adventurerClass}</td>
              <td>{brand}</td>
              <td>{drink}</td>
              <td>{numDrinks}</td>
              <td>{order}</td>
            </tr>
          ),
        )}
      </StyledTable>
      <p>
        These drink names are kind of odd. Looking back at the clues, each
        adventurer is described with an epithet or insult by one of the other
        adventurers. These epithets suggest transforms.
      </p>
      <StyledTable>
        <tr>
          <th>Name</th>
          <th>Class</th>
          <th>Epithet</th>
          <th>Transform</th>
          <th>Brand</th>
          <th>Transformed</th>
          <th>Order</th>
        </tr>
        {DATA.map(
          ({
            name,
            adventurerClass,
            epithet,
            transform,
            brand,
            transformed,
            order,
          }) => (
            <tr key={order}>
              <td>{name}</td>
              <td>{adventurerClass}</td>
              <td>{epithet}</td>
              <td>{transform}</td>
              <td>{brand}</td>
              <td>{transformed}</td>
              <td>{order}</td>
            </tr>
          ),
        )}
      </StyledTable>
      <p>
        In Dungeons and Dragons, the appropriate skill check to steal in this
        manner would be{" "}
        <code>
          <strong>SLEIGHT OF HAND</strong>
        </code>
        .
      </p>
      <h3>Full Solve Path</h3>
      <p>Some clues tell us associations outright. These associations are:</p>
      <ul>
        <li>Fighter passed out last (Fighter # 1)</li>
        <li>
          Bard passed out 5th—he knew the other three were the last standing but
          does not count himself among them (Bard # 2)
        </li>
      </ul>
      <p>
        From Fighter # 3, we know that Tabitha had less than 10 drinks, but not
        exactly 8. From Wizard # 3, we know that Tabitha can’t have had 7
        drinks, because Oliver had that number of drinks. From Artificer # 1,
        Tabitha had exactly one drink more than Yaron, so she can’t have had 5
        drinks. Therefore, Tabitha had 9 drinks and Yaron had 8 drinks.
      </p>
      <p>
        From Wizard # 1, Gracie can’t have had 5 drinks, because the Wizard had
        one fewer than her. From Fighter #2, the Artificer had as many drinks as
        Gracie and Yaron combined, so Gracie must have had 13 drinks, as no
        other number of drinks produces a valid total number of drinks. The
        Artificer therefore had 21 drinks. From Rogue #2, Gracie drank ale. From
        Wizard # 1, the Wizard had 12 drinks, one less than Gracie. From
        Sorcerer # 3, the Wizard is Patrick.
      </p>
      <p>
        From Bard # 1, the Artificer cannot be Alison, because the Artificer had
        the most drinks and the Bard had more drinks than Alison. The Artificer
        also cannot be any of Gracie, Oliver, Patrick, Tabitha, and Yaron,
        because they had the wrong number of drinks. Therefore the Artificer is
        August.
      </p>
      <p>
        From Sorcerer # 1, The Fighter was not drinking fernet, gin, rye,
        tequila, or vodka. From Paladin # 1, the Fighter was not drinking wine.
        From Fighter # 1, the fighter had 15 drinks, and from Rogue # 2, there
        were 13 ales drunk, so the Fighter could not have been drinking ale.
        Therefore the Fighter was drinking mead. From Artificer # 2, Bill was
        drinking mead, so the Fighter is Bill. By process of elimination, Alison
        had 5 drinks. By Paladin # 2, Alison is the Sorcerer.
      </p>
      <p>
        From Wizard # 2, the Rogue had either 5 or 7 drinks. From Paladin # 2,
        the Sorcerer had 5 drinks, so the Rogue had 7 drinks. From Wizard # 3,
        the Rogue is Oliver. From Rogue # 3, Oliver drank gin.
      </p>
      <p>
        From Rogue # 1, the Monk was not drinking fernet, gin, rye, tequila, or
        vodka. From Paladin # 1, the Monk was not drinking wine. From earlier
        deduction, the Monk was not drinking mead because the Fighter was
        drinking it instead. Therefore, the Monk was drinking ale, making her
        Gracie, who had 13 drinks.
      </p>
      <p>
        From Bard # 2, the Bard is not Tabitha. From earlier deduction, he is
        also not Alison, August, Bill, or Oliver, or Patrick. Therefore, the
        Bard is Yaron. By process of elimination, the Paladin is Tabitha.
      </p>
      <p>
        From Paladin # 3, rye and gin had the fewest number of drinks. Oliver
        the Rogue had 7 drinks of gin, so Alison the Sorcerer must have had 5
        drinks of Rye. Also from Paladin # 3, tequila had the most drinks of the
        spirits. Ale had 13 drinks, mead had 15 drinks, and wine had 21 drinks,
        so tequila had 12 drinks. That means tequila was drunk by Patrick the
        Wizard.
      </p>
      <p>
        From Monk # 1, Tabitha had a drink made from grapes. From earlier
        deduction, Tabitha is not drinking ale, gin, mead, tequila, or wine.
        Vodka is not made from grapes, so Tabitha was drinking fernet. By
        process of elimination, Yaron was drinking vodka.
      </p>
      <p>
        This gets us all the information about who was drinking what, but we
        have nothing yet about who passed out when:
      </p>
      <StyledTable>
        <tr>
          <th>Name</th>
          <th>Class</th>
          <th>Drink</th>
          <th># Drinks</th>
        </tr>
        {DATA.toSorted((a, b) => a.name.localeCompare(b.name)).map(
          ({ name, adventurerClass, drink, numDrinks }) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{adventurerClass}</td>
              <td>{drink}</td>
              <td>{numDrinks}</td>
            </tr>
          ),
        )}
      </StyledTable>
      <p>
        Some of the pass-out order is stated explicitly. From Fighter # 1, Bill
        the Fighter passed out last. From this and Bard # 2, August the
        Artificer and Tabitha the Paladin passed out in 6th and 7th, in some
        order. We can infer that the Bard can only know this if he passed out
        5th, seeing the previous four adventurers unconscious and the later
        three awake. From Bard # 1, the Bard passed out immediately after Alison
        the Sorcerer, so Alison passed out 4th.
      </p>
      <p>
        From Wizard # 1, the Wizard passed out after Gracie the Monk, or else he
        would not know for sure how many drinks Gracie had. Similarly, from
        Wizard # 2, the Wizard passed out after Oliver the Rogue. Therefore, the
        earliest the Wizard could have passed out was 3rd. From Bard # 3, the
        person who had 12 drinks—Patrick the Wizard—passed out before the Bard
        did, i.e. before 5th place. From earlier deduction, Alison the Sorcerer
        passed out 4th. By process of elimination, the Wizard passed out 3rd.
      </p>
      <p>
        From Sorcerer # 2, the Rogue passed out after the Monk. From Wizard # 2,
        the Wizard passed out after the Rogue. Therefore the Rogue passed out
        2nd and the Monk passed out 1st.
      </p>
      <p>
        From Artificer # 1, Tabitha passed out immediately after Yaron.
        Therefore, Tabitha passed out 6th. By process of elimination, August
        passed out 7th.
      </p>
      <h3>Author’s Note</h3>
      <p>
        All the names are intended to be very obliquely meaningful.{" "}
        <a
          href="https://en.wikipedia.org/wiki/Gracie_family"
          target="_blank"
          rel="noreferrer"
        >
          Gracie
        </a>{" "}
        is a reference to the Gracie family of Brazilian Jiu-jitsu
        practitioners. Oliver is a reference to{" "}
        <a
          href="https://en.wikipedia.org/wiki/Oliver_Twist"
          target="_blank"
          rel="noreferrer"
        >
          Oliver Twist
        </a>
        . Patrick is a reference to{" "}
        <a
          href="https://en.wikipedia.org/wiki/Saint_Patrick"
          target="_blank"
          rel="noreferrer"
        >
          Saint Patrick
        </a>
        , who drove the snakes out of Ireland, just as the wizard’s familiar has
        departed. Alison is a reference to{" "}
        <a
          href="https://en.wikipedia.org/wiki/Granny_Weatherwax"
          target="_blank"
          rel="noreferrer"
        >
          Granny Weatherwax’s
        </a>{" "}
        own granny. Yaron is a{" "}
        <a
          href="https://en.wikipedia.org/wiki/Witches_(Discworld)#Alison_%22Nana%22_Weatherwax"
          target="_blank"
          rel="noreferrer"
        >
          Hebrew name
        </a>{" "}
        meaning song. Tabitha is a few letters off from{" "}
        <a
          href="https://en.wikipedia.org/wiki/Tabard"
          target="_blank"
          rel="noreferrer"
        >
          tabard
        </a>
        , which would have been a bit too obvious. August is an Anglicized
        version of Augustus, a title for Roman emperors and a name for many
        latter-day rulers, all of whom were fond of commissioning expensive
        jewelry. Bill is a{" "}
        <a
          href="https://en.wikipedia.org/wiki/Bill_(weapon)"
          target="_blank"
          rel="noreferrer"
        >
          type of halberd
        </a>
        .
      </p>
    </>
  );
};

export default Solution;
