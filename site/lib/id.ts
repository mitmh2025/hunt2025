// A pool of characters that are not easily mistaken for each other
const UNIQUE_CHARS = "23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz";
function genId() {
  // Note: we don't care about quality of randomness here.  This RNG slightly
  // overweights the first options and underweights the last ones, and we don't
  // care.
  const len = 16;
  let result = "";
  const choices = crypto.getRandomValues(new Uint8Array(len));
  for (const choice of choices) {
    const offset = choice % UNIQUE_CHARS.length;
    result += UNIQUE_CHARS.slice(offset, offset + 1);
  }
  return result;
}

export { genId };
