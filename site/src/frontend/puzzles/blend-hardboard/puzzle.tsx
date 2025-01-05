import React from "react";
import { styled } from "styled-components";

const DATA: ListingProps[] = [
  {
    timestamp: "1pm",
    title: "RED REDEMPTION; 60 min.",
    description:
      "Angie used to be a teacher, but now she's a long way from home and ready to learn. In the Summer Palace she has a vision of the world at peace. After yet another big dinner, her husband admits that he was wrong.",
  },
  {
    timestamp: "2pm",
    title: "DON’T GIVE ME THAT BULL; 60 min.",
    description:
      "After falling for a local trouble-maker from the cigarette factory, Emily spent two months in the brig for refusing an order. Now they've gone on the run together. Will he break free of her spell, or be left with a faded flower?",
  },
  {
    timestamp: "3pm",
    title: "THE BUTCHER, THE BAKER AND WHATSHISNAME; 60 min.",
    description:
      "The only virgin left in town has been crowned at the spring festival. But Sid and Henry are up to old tricks. After a spiked lemonade and some life lessons, will the May Monarch still be dressed in white?",
  },
  {
    timestamp: "4pm",
    title: "IN YON SHADY GLEN; 60 min.",
    description:
      "As the dance gets under way, Nettie's sister is mad because she was tricked into signing a document while her lover was away in France. But now he's back in the glen, and she's regretting her decision to put the family first.",
  },
  {
    timestamp: "5pm",
    title: "WAR NOT MAKE ONE GREAT; 60 min.",
    description:
      "Love is in the air, and tranquility is gone. Joe’s in love with a wounded soldier. Enter a rival, who has taken French leave. After trying to kill her, and torching her cottage, the visitor pleads temporary insanity and returns to the wars, where he can resume killing in a more socially acceptable fashion.",
  },
  {
    timestamp: "6pm",
    title: "FOR THE LOVE OF MIKE; 60 min.",
    description:
      "Pat has tracked down the man that she thinks killed her father, and corners him at a wedding reception. She tries to round up a posse to seek revenge, but her father proves surprisingly capable of standing up for himself. Guess who’s coming to dinner.",
  },
  {
    timestamp: "7pm",
    title: "HER FOUR LOVERS; 60 min.",
    description:
      "A young composer just wants a bit of respect. What he gets is a load of song and dance. His teacher tries to convince him that the show must go on, but Anna’s attentions prove more persuasive. Will he get more than he bargained for? Fireworks are guaranteed, and the dance ends here.",
  },
  {
    timestamp: "8pm",
    title: "LOVE IS BLIND; 60 min.",
    description:
      "Hilda finally visits their betrothed, but only after falling in love with someone else. His friend takes a stroll in her garden and finds that a rose of another colour might smell as sweet. Will she do what it takes to be able to see him?",
  },
  {
    timestamp: "9pm",
    title: "GENERAL MAYHEM; 60 min.",
    description:
      "The General's wife is virtuous and has a faithful friend in Robert. But her husband is scheming to bring everyone down. Will he succeed? And then will he succeed? She's lost a handkerchief, but how much more will she lose?",
  },
  {
    timestamp: "10pm",
    title: "A COMPLETE SPECTACLE; 60 min.",
    description:
      "(part 4 of 4) Nancy's beau has put a ring on it, but he's already looking for new adventures. Is he going to sell her down the river, or will he be back before time runs out?",
  },
];

const StyledHeader = styled.div`
  display: flex;
  align-items: baseline;
  font-weight: bold;
`;

const Timestamp = styled.span`
  background-color: var(--black);
  color: white;
  margin-right: 8px;
  padding: 0 8px;
  align-self: stretch;
  display: flex;
  align-items: center;
`;

const BigCaps = styled.span`
  font-size: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(5, auto);
  grid-template-columns: repeat(2, auto);
  gap: 1em;
`;

type ListingProps = {
  timestamp: string;
  title: string;
  description: string;
};

const Header = ({
  timestamp,
  title,
}: Omit<ListingProps, "description">): JSX.Element => {
  return (
    <StyledHeader>
      <Timestamp>
        <span>{timestamp}</span>
      </Timestamp>
      <BigCaps>{title.slice(0, 1)}</BigCaps>
      {title.slice(1)}
    </StyledHeader>
  );
};

const Listing = ({
  timestamp,
  title,
  description,
}: ListingProps): JSX.Element => {
  return (
    <div>
      <Header timestamp={timestamp} title={title} />
      <div>{description}</div>
    </div>
  );
};

const Puzzle = (): JSX.Element => {
  return (
    <>
      <Grid>
        {DATA.map((props, i) => (
          <Listing key={i} {...props} />
        ))}
      </Grid>
    </>
  );
};

export default Puzzle;
