import React from "react";
import { styled } from "styled-components";
import LinkedImage from "../../components/LinkedImage";
import left1 from "./assets/left1.jpg";
import left10 from "./assets/left10.jpg";
import left11 from "./assets/left11.jpg";
import left2 from "./assets/left2.jpg";
import left3 from "./assets/left3.jpg";
import left4 from "./assets/left4.jpg";
import left5 from "./assets/left5.jpg";
import left6 from "./assets/left6.jpg";
import left7 from "./assets/left7.jpg";
import left8 from "./assets/left8.jpg";
import left9 from "./assets/left9.jpg";
import right1 from "./assets/right1.jpg";
import right10 from "./assets/right10.jpg";
import right11 from "./assets/right11.jpg";
import right2 from "./assets/right2.jpg";
import right3 from "./assets/right3.jpg";
import right4 from "./assets/right4.jpg";
import right5 from "./assets/right5.jpg";
import right6 from "./assets/right6.jpg";
import right7 from "./assets/right7.jpg";
import right8 from "./assets/right8.jpg";
import right9 from "./assets/right9.jpg";

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  td {
    padding: 1em;
    border: 1px solid black;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledImage = styled(LinkedImage)`
  display: block;
  width: 450px;
`;

const COMMON_LEFT_ALT_TEXT =
  "A bunch of ingredients scattered on a countertop:";

const DATA = [
  {
    left: left1,
    leftAlt: "flour, sugar, peanut butter, cream cheese, butter, and eggs.",
    leftEnum: "(5’1 11 9 7 6 3)",
    right: right1,
    rightAlt:
      "A bowl of thick brown cookies with cracked tops with scattered sugar crystals",
    rightEnum: "(8 7 7) ¼ C",
  },
  {
    left: left2,
    leftAlt:
      "flour, baking soda, powdered sugar, salt, baking powder, oil, eggs, butter, cream cheese, ground cinnamon, vanilla extract, and carrots.",
    leftEnum: "(8 7 7) ¼ C",
    right: right2,
    rightAlt:
      "A round loaf of bread, partially sliced up, on a wooden cutting board.",
    rightEnum: "(10 2-5 6 5 5) ¼ t",
  },
  {
    left: left3,
    leftAlt:
      "flour, a pie crust, butter, whipped cream in a tube, brown sugar, and salt.",
    leftEnum: "(6 5 8 4 5 6 3 7 & 7)",
    right: right3,
    rightAlt: "A plate full of squares of chocolate fudge.",
    rightEnum: "(6 4 5 6 5) 1 t",
  },
  {
    left: left4,
    leftAlt:
      "baking soda, butter, sugar, vanilla extract, bananas, eggs, salt, and buttermilk.",
    leftEnum: "(4 5 3 7 5)",
    right: right4,
    rightAlt: "A plate full of squares of marble brownies.",
    rightEnum: "(6 6 10 8) 5",
  },
  {
    left: left5,
    leftAlt:
      "ground ginger, flour, baking soda, ground cloves, salt, eggs, brown sugar, ground cinnamon, and vegetable shortening.",
    leftEnum: "(7’1 8)",
    right: right5,
    rightAlt: "A plate with a thick slice of chocolate cake.",
    rightEnum: "(6 9 4) 3 oz",
  },
  {
    left: left6,
    leftAlt: "water, yeast, and salt.",
    leftEnum: "(4 6 10 5 5)",
    right: right6,
    rightAlt: "A plate full of lumpy cookies.",
    rightEnum: "(9 7 6 7) ½ t (optional)",
  },
  {
    left: left7,
    leftAlt: "honey, baking powder, walnuts, bananas, flour, eggs, and milk.",
    leftEnum: "(7 7)",
    right: right7,
    rightAlt:
      "A plate full of white-frosted cupcakes, each with a tiny decorative candy carrot on top.",
    rightEnum: "(6 4 8) 1 ½ C",
  },
  {
    left: left8,
    leftAlt:
      "evaporated milk, butter, salt, vanilla extract, marshmallows, and sugar.",
    leftEnum: "(6 4 5 4-5 7)",
    right: right8,
    rightAlt: "A red-gingham-lined basket with golden-brown biscuits.",
    rightEnum: "(6-6 8) 2 C",
  },
  {
    left: left9,
    leftAlt: "butter, flour, oil, cheddar cheese, and garlic powder.",
    leftEnum: "(8 8 7 & 6 3)",
    right: right9,
    rightAlt:
      "A crumbed fruit pie topped with a splotch of whipped cream and two cherries.",
    rightEnum: "(6 8 3) ½ C",
  },
  {
    left: left10,
    leftAlt:
      "raisins, salt, butter, eggs, vanilla extract, brown sugar, flour, ground cinnamon, sugar, and baking soda.",
    leftEnum: "(6 4)",
    right: right10,
    rightAlt:
      "A rectangular loaf of bread, partially sliced up, on a wooden cutting board.",
    rightEnum: "(6 5) 2 ½ C",
  },
  {
    left: left11,
    leftAlt:
      "milk, powdered sugar, vanilla extract, butter, chocolate, eggs, salt, water, brown sugar, baking soda, and sour cream.",
    leftEnum: "(5 4 4 5)",
    right: right11,
    rightAlt:
      "A blue-cloth-lined basket full of muffins with chopped-up nuts protruding from their tops.",
    rightEnum: "(6-3 6 7) 2 T",
  },
];

const Puzzle = (): JSX.Element => {
  return (
    <>
      <StyledTable>
        {DATA.map(
          ({ left, leftAlt, leftEnum, right, rightAlt, rightEnum }, i) => (
            <tr key={i}>
              <td>
                <FlexWrapper>
                  <StyledImage
                    src={left}
                    alt={`${COMMON_LEFT_ALT_TEXT} ${leftAlt}`}
                  />
                  <span>{leftEnum}</span>
                </FlexWrapper>
              </td>
              <td>
                <FlexWrapper>
                  <StyledImage src={right} alt={rightAlt} />
                  <span>{rightEnum}</span>
                </FlexWrapper>
              </td>
            </tr>
          ),
        )}
      </StyledTable>
    </>
  );
};

export default Puzzle;
