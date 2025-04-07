type LightValue = 0 | 1 | 2;
export type Inputs = [
  LightValue,
  LightValue,
  LightValue,
  LightValue,
  LightValue,
  LightValue,
  LightValue,
  LightValue,
  LightValue,
];
type Outputs = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
];

function rule1(inputs: Inputs): number {
  // Value of the central cell
  return inputs[4];
}

function rule2(inputs: Inputs): number {
  // Number of pairwise swaps needed to sort the central column so that brighter is higher
  const colsort = [inputs[7], inputs[4], inputs[1]];
  const col = [inputs[7], inputs[4], inputs[1]];
  colsort.sort();
  let swaps = -1;
  for (let i = 0; i < 3; i++) {
    if (col[i] !== colsort[i]) swaps++;
  }
  if (swaps === -1) swaps = 0;

  return swaps;
}

function rule3(inputs: Inputs): number {
  // Total value of the four edge lights, modulo 3
  const result = (inputs[1] + inputs[3] + inputs[5] + inputs[7]) % 3;
  return result;
}

function rule4(inputs: Inputs): number {
  // Number of horizontal or vertical mirror symmetries of the grid
  const hasHorizontalSymmetry =
    inputs[0] === inputs[2] &&
    inputs[3] === inputs[5] &&
    inputs[6] === inputs[8];
  const hasVerticalSymmetry =
    inputs[0] === inputs[6] &&
    inputs[1] === inputs[7] &&
    inputs[2] === inputs[8];
  const result =
    (hasHorizontalSymmetry ? 1 : 0) + (hasVerticalSymmetry ? 1 : 0);
  return result;
}

function rule5(inputs: Inputs): number {
  // Absolute difference between upper-left and lower-right cells
  const upperLeft = inputs[0];
  const lowerRight = inputs[8];
  const difference = Math.abs(upperLeft - lowerRight);
  return difference;
}

function rule6(inputs: Inputs): number {
  // Absolute difference between upper-right and lower-left cells
  const upperRight = inputs[2];
  const lowerLeft = inputs[6];
  const difference = Math.abs(upperRight - lowerLeft);
  return difference;
}

function rule7(inputs: Inputs): number {
  // Distinct brightnesses present, (1, 2, 3)
  const counts: [number, number, number] = [0, 0, 0];
  inputs.forEach((i: LightValue) => {
    counts[i] += 1;
  });
  const nonzeros: [number, number, number] = counts.map((count) =>
    count > 0 ? 1 : 0,
  ) as [number, number, number];
  const distinctBrightnesses = nonzeros[0] + nonzeros[1] + nonzeros[2];
  return distinctBrightnesses - 1;
}

function rule8(inputs: Inputs): number {
  // Brightness value of the longest grid-aligned equal-brightness line, ties to brighter
  let best: [number, number] = [0, 0];
  let row: [number, number, number] = [0, 0, 0];
  let num = 0;
  let bestcheck: [number, number] = [0, 0];
  for (let i = 0; i < 3; i++) {
    num = 1;
    row = [inputs[i * 3 + 0], inputs[i * 3 + 1], inputs[i * 3 + 2]] as [
      number,
      number,
      number,
    ];
    if (row[0] === row[1]) num++;
    if (row[2] === row[1]) num++;
    bestcheck =
      num > 1 ? [num, row[1]] : ([1, row.sort()[2]] as [number, number]);
    if (
      bestcheck[0] > best[0] ||
      (bestcheck[0] === best[0] && bestcheck[1] > best[1])
    ) {
      best = bestcheck;
    }
  }
  for (let j = 0; j < 3; j++) {
    num = 1;
    row = [inputs[j], inputs[j + 3], inputs[j + 6]] as [number, number, number];
    if (row[0] === row[1]) num++;
    if (row[2] === row[1]) num++;
    bestcheck = num > 1 ? [num, row[1]] : [1, row.sort()[2]];
    if (
      bestcheck[0] > best[0] ||
      (bestcheck[0] === best[0] && bestcheck[1] > best[1])
    ) {
      best = bestcheck;
    }
  }
  return best[1];
}

function rule9(inputs: Inputs): number {
  // Zero-indexed position of dimmest column, ties going to lower.
  const col0 = inputs[0] + inputs[3] + inputs[6];
  const col1 = inputs[1] + inputs[4] + inputs[7];
  const col2 = inputs[2] + inputs[5] + inputs[8];
  if (col2 < col1 && col2 < col0) return 2;
  if (col1 < col0) return 1;
  return 0;
}

export function inputsToOutputs(inputs: Inputs): Outputs {
  let prog = 0;
  if (rule1(inputs) === inputs[0]) prog = prog + 1;
  if (rule2(inputs) === inputs[1]) prog = prog + 1;
  if (rule3(inputs) === inputs[2]) prog = prog + 1;
  if (rule4(inputs) === inputs[3]) prog = prog + 1;
  if (rule5(inputs) === inputs[4]) prog = prog + 1;
  if (rule6(inputs) === inputs[5]) prog = prog + 1;
  if (rule7(inputs) === inputs[6]) prog = prog + 1;
  if (rule8(inputs) === inputs[7]) prog = prog + 1;
  if (rule9(inputs) === inputs[8]) prog = prog + 1;
  return [
    rule1(inputs),
    rule2(inputs),
    rule3(inputs),
    rule4(inputs),
    rule5(inputs),
    rule6(inputs),
    rule7(inputs),
    rule8(inputs),
    rule9(inputs),
    prog >= 1 ? 1 : 0,
    prog >= 2 ? 1 : 0,
    prog >= 3 ? 1 : 0,
    prog >= 4 ? 1 : 0,
    prog >= 5 ? 1 : 0,
    prog >= 6 ? 1 : 0,
    prog >= 7 ? 1 : 0,
    prog >= 8 ? 1 : 0,
    prog >= 9 ? 1 : 0,
  ];
}

const part2Grids = [
  ["123", "456", "789"],
  ["584", "231", "967"],
  ["869", "245", "317"],
  ["428", "375", "961"],
  ["612", "593", "847"],
];

export const part2String = part2Grids
  .map((grid: string[]) => grid.join("\n"))
  .join("\n\n\n");
