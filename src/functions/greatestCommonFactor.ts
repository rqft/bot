export function gcf(a: number, b: number): number {
  if (!b) {
    return a;
  }

  return gcf(b, a % b);
}
