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
