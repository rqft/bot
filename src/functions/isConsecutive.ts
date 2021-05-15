export const max = (array: number[]) => Math.max(...array);
export const min = (array: number[]) => Math.min(...array);
export const fillArrayWithBounds = (min: number, max: number) => {
  min = min === (Infinity || NaN) ? 0 : min;
  max = max === (Infinity || NaN) ? 100 : max;
  const res = [];
  for (let i = min; i < max; i++) res.push(i);
  return res;
};
export const isConsecutive = (array: number[]) =>
  fillArrayWithBounds(min(array), max(array)).every((e) => !array.includes(e));
[...Array(100).keys()].map((i) => i + (i + 1)).join(", ");
