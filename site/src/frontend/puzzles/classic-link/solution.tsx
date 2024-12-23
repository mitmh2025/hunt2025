import React from "react";
import { styled } from "styled-components";

const Mono = styled.span`
  font-family: monospace;
`;

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

const DATA = [
  {
    product: "Baker’s Unsweetened Chocolate Premium Baking Bar",
    productEnumeration: "(5’1 11 9 7 6 3)",
    recipe: "Molasses Crinkle Cookies",
    recipeEnumeration: "(8 7 7)",
    quantity: "1/4 C",
    ingredient: "Grandma’s Molasses",
    letter: "G",
  },
  {
    product: "Domino Granulated Sugar",
    productEnumeration: "(6 10 5)",
    recipe: "Absolutely No-Knead Crusty Chewy Bread",
    recipeEnumeration: "(10 2-5 6 5 5)",
    quantity: "1/4 t",
    ingredient: "Instant yeast",
    letter: "I",
  },
  {
    product: "Duncan Hines Comstock More Fruit Cherry Pie Filling & Topping",
    productEnumeration: "(6 5 8 4 5 6 3 7 & 7)",
    recipe: "Nestle Toll House Famous Fudge",
    recipeEnumeration: "(6 4 5 6 5)",
    quantity: "1 t",
    ingredient: "Vanilla extract",
    letter: "V",
  },
  {
    product: "Gold Medal All Purpose Flour",
    productEnumeration: "(4 5 3 7 5)",
    recipe: "Peanut Butter Cheesecake Brownies",
    recipeEnumeration: "(6 6 10 8)",
    quantity: "5",
    ingredient: "Eggs",
    letter: "E",
  },
  {
    product: "Grandma’s Molasses",
    productEnumeration: "(7’1 8)",
    recipe: "Simple Chocolate Cake",
    recipeEnumeration: "(6 9 4)",
    quantity: "3 oz",
    ingredient: "Unsweetened chocolate",
    letter: "U",
  },
  {
    product: "King Arthur Unbleached Bread Flour",
    productEnumeration: "(4 6 10 5 5)",
    recipe: "Vanishing Oatmeal Raisin Cookies",
    recipeEnumeration: "(9 7 6 7)",
    quantity: "1/2 t (optional)",
    ingredient: "Salt",
    letter: "S",
  },
  {
    product: "Nabisco Grahams",
    productEnumeration: "(7 7)",
    recipe: "Carrot Cake Cupcakes",
    recipeEnumeration: "(6 4 8)",
    quantity: "1 1/2 C",
    ingredient: "Domino Granulated Sugar",
    letter: "D",
  },
  {
    product: "Nestle Toll House Semi-Sweet Morsels",
    productEnumeration: "(6 4 5 4-5 7)",
    recipe: "Cheese-Garlic Biscuits",
    recipeEnumeration: "(6-6 8)",
    quantity: "2 C",
    ingredient: "Original Bisquick Baking Mix",
    letter: "O",
  },
  {
    product: "Original Bisquick Pancake & Baking Mix",
    productEnumeration: "(8 8 7 & 6 3)",
    recipe: "Cherry Streusel Pie",
    recipeEnumeration: "(6 8 3)",
    quantity: "1/2 C",
    ingredient: "Unsalted butter",
    letter: "U",
  },
  {
    product: "Quaker Oats",
    productEnumeration: "(6 4)",
    recipe: "Banana Bread",
    recipeEnumeration: "(6 5)",
    quantity: "2 1/2 C",
    ingredient: "Gold Medal All Purpose Flour",
    letter: "G",
  },
  {
    product: "Swans Down Cake Flour",
    productEnumeration: "(5 4 4 5)",
    recipe: "Banana-Nut Graham Muffins",
    recipeEnumeration: "(6-3 6 7)",
    quantity: "2 T",
    ingredient: "Honey",
    letter: "H",
  },
];

const Solution = (): JSX.Element => {
  return (
    <>
      <p>
        Solvers are presented with photos of both ingredients and finished baked
        goods, all with enumerations. The baked goods also have a measurement
        next to them.
      </p>
      <p>
        Solvers will have to match the ingredient photos with the final product
        photos based on their baking instinct, and realize that in each
        ingredient photo one ingredient is missing. This is always a brand-name
        item, and matches the enumeration under that photo. The enumeration
        under the finished item photo matches a specific name (ie “Molasses
        Crinkle Cookies”) of a recipe on the back of the package of each of
        these brand-name ingredients. This is the major a-ha.
      </p>
      <p>
        By finding these recipes, solvers can identify the ingredient within the
        recipe matching the given measurement. Reading out first letters of
        these spells the answer, <Mono>GIVE US DOUGH</Mono>.
      </p>
      <p>
        When solvers brought a baked good to the Gala, they were offered the
        final answer,{" "}
        <Mono>
          <strong>BANANA BREAD</strong>
        </Mono>
        .
      </p>
      <h3>Full data set</h3>
      <StyledTable>
        <tr>
          <th>Product</th>
          <th>Product Enumeration</th>
          <th>Recipe</th>
          <th>Recipe Enumeration</th>
          <th>Quantity</th>
          <th>Missing Ingredient</th>
          <th>Letter</th>
        </tr>
        {DATA.map(
          (
            {
              product,
              productEnumeration,
              recipe,
              recipeEnumeration,
              quantity,
              ingredient,
              letter,
            },
            i,
          ) => (
            <tr key={i}>
              <td>{product}</td>
              <td>{productEnumeration}</td>
              <td>{recipe}</td>
              <td>{recipeEnumeration}</td>
              <td>{quantity}</td>
              <td>
                <Red>
                  <strong>{letter}</strong>
                </Red>
                {ingredient.slice(1)}
              </td>
              <td>
                <strong>{letter}</strong>
              </td>
            </tr>
          ),
        )}
      </StyledTable>
    </>
  );
};

export default Solution;
