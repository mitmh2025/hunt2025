export function median(arr: number[]): number {
  if (arr.length === 0) {
    return 0;
  }

  if (arr.length === 1) {
    return arr[0] ?? 0;
  }

  const sorted = arr.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    const a = sorted[mid - 1] ?? 0;
    const b = sorted[mid] ?? 0;
    return (a + b) / 2;
  }

  return sorted[mid] ?? 0;
}
