export function parseTimeString(time: string) {
  const timeSuffix = {
    i: 1,
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
  };

  const TIME_REGEX = /(\d+)([ismhdw])/g;

  return Array.from(time.matchAll(TIME_REGEX)).reduce(
    // @ts-ignore
    (p, [, num, suffix]) => p + parseInt(num!, 10) * timeSuffix[suffix!]!,
    0
  );
}
