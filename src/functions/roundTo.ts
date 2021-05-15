export const roundTo = (array: number[], target: number) =>
  array.reduce(function (prev, curr) {
    return Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev;
  });
