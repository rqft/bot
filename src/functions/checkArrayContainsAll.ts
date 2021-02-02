export function arrayContainsAll(arr: any[], target: any[]) {
  return target.every((v) => arr.includes(v));
}
