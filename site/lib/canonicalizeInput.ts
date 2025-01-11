function canonicalizeInput(input: string) {
  return input
    .normalize("NFD")
    .replaceAll(/[^\p{L}\p{N}]/gu, "")
    .toUpperCase();
}

export default canonicalizeInput;
