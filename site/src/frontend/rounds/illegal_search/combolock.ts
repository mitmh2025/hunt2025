// These values are used by both client and server

export const TUMBLER_INITIAL_STATE: [number, number, number] = [0, -179, 0];
export const TUMBLER_OFFSET_DEGREES = 5;

export function clampAngle(angle: number): number {
  // clamps angle, in degrees, to the range [-180, 180)
  const angleMod360 = angle % 360; // This may still be negative!  JS modulo is weird.
  return ((angleMod360 + 360 + 180) % 360) - 180;
}

export function angularDelta(angle: number, nextAngle: number): number {
  return clampAngle(nextAngle - angle);
}

export function rotateMainTumblerBy(
  deltaDegrees: number,
  [prevTumbler0, prevTumbler1, prevTumbler2]: [number, number, number],
): [number, number, number] {
  const newTumbler0 = clampAngle(prevTumbler0 + deltaDegrees);
  let newTumbler1 = prevTumbler1;
  let newTumbler2 = prevTumbler2;
  // Determine if moving tumbler 0 from prevTumbler0 to newTumbler0 should also move tumbler 1, and by how much.
  // We should bind the tumblers if
  // * the resulting position would overlap, or
  // * the tumblers would have switched relative positions (this can happen if we move by a
  //   large amount at once, and one tumbler would clip through the exclusion area around the
  //   next)
  const prevDelta1 = angularDelta(prevTumbler0, prevTumbler1);
  const delta1 = angularDelta(newTumbler0, prevTumbler1);
  if (
    deltaDegrees > 0 &&
    ((0 < delta1 && delta1 < TUMBLER_OFFSET_DEGREES) ||
      (prevDelta1 > 0 && delta1 < 0))
  ) {
    // Advance tumbler1 to newTumbler0 + TUMBLER_OFFSET_DEGREES
    newTumbler1 = clampAngle(newTumbler0 + TUMBLER_OFFSET_DEGREES);
  }
  if (
    deltaDegrees < 0 &&
    ((0 > delta1 && delta1 > -TUMBLER_OFFSET_DEGREES) ||
      (prevDelta1 < 0 && delta1 > 0))
  ) {
    // Reverse tumbler1 to newTumbler0 - TUMBLER_OFFSET_DEGREES
    newTumbler1 = clampAngle(newTumbler0 - TUMBLER_OFFSET_DEGREES);
  }

  // ditto tumbler1 moving tumbler2
  const prevDelta2 = angularDelta(prevTumbler1, prevTumbler2);
  const delta2 = angularDelta(newTumbler1, prevTumbler2);
  if (
    deltaDegrees > 0 &&
    ((0 < delta2 && delta2 < TUMBLER_OFFSET_DEGREES) ||
      (prevDelta2 > 0 && delta2 < 0))
  ) {
    newTumbler2 = clampAngle(newTumbler1 + TUMBLER_OFFSET_DEGREES);
  }
  if (
    deltaDegrees < 0 &&
    ((0 > delta2 && delta2 > -TUMBLER_OFFSET_DEGREES) ||
      (prevDelta2 < 0 && delta2 > 0))
  ) {
    newTumbler2 = clampAngle(newTumbler1 - TUMBLER_OFFSET_DEGREES);
  }

  return [newTumbler0, newTumbler1, newTumbler2];
}

// How much error do we allow in the tumbler states?  Each tick is 7.2 degrees, so this is "must be
// actually closest to that number, but no pickier"
export const MAX_TOLERANCE_DEGREES = 3.6;

export function isRoughlyEqual(
  exact: number,
  test: number,
  maxDelta: number,
): boolean {
  const lowerBound = exact - maxDelta;
  const upperBound = exact + maxDelta;
  return lowerBound <= test && test <= upperBound;
}

function degreesForTick(value: number): number {
  return clampAngle(((50 - value) * 360) / 50);
}

// Angle, in positive degrees, between the two tick values on the dial
function clockwiseAngleBetween(start: number, end: number): number {
  const startDegs = degreesForTick(start);
  const endDegs = degreesForTick(end);
  return endDegs >= startDegs ? endDegs - startDegs : endDegs + 360 - startDegs;
}

export function simulatedTumblerPositions(
  code: [number, number, number],
): [number, number, number] {
  // console.log("Simulating tumblers after entering", code);
  let tumblers = TUMBLER_INITIAL_STATE;
  // Two full clockwise turns to pick up all three tumblers + turn to the first number
  let remainingRotation = 360 + 360 + clockwiseAngleBetween(0, code[0]);
  // We step by small amounts because the logic for the tumbler-binding
  while (remainingRotation > 0) {
    const step = Math.min(60, remainingRotation);
    tumblers = rotateMainTumblerBy(step, tumblers);
    // console.log("step", step, ": tumblers now", tumblers);
    remainingRotation -= step;
  }

  // One full counterclockwise turn, then another (360 - the clockwise distance) to get ot the second number
  remainingRotation = -360 - 360 + clockwiseAngleBetween(code[0], code[1]);
  while (remainingRotation < 0) {
    const step = Math.max(-60, remainingRotation);
    tumblers = rotateMainTumblerBy(step, tumblers);
    // console.log("step", step, ": tumblers now", tumblers);
    remainingRotation -= step;
  }

  // Clockwise from the second number to the third number
  remainingRotation = clockwiseAngleBetween(code[1], code[2]);
  while (remainingRotation > 0) {
    const step = Math.max(-60, remainingRotation);
    tumblers = rotateMainTumblerBy(step, tumblers);
    // console.log("step", step, ": tumblers now", tumblers);
    remainingRotation -= step;
  }

  return tumblers;
}
