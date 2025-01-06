export function median(arr: number[]): number {
  if (arr.length === 0) {
    return NaN;
  }

  if (arr.length === 1) {
    return arr[0] ?? NaN;
  }

  const sorted = arr.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    const a = sorted[mid - 1] ?? NaN;
    const b = sorted[mid] ?? NaN;
    return (a + b) / 2;
  }

  return sorted[mid] ?? NaN;
}
