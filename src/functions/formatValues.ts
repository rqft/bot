export function formatValues(obj: any) {
  const keys = Object.keys(obj);

  const longestKey = keys.reduce((a, b) => (a.length > b.length ? a : b));
  const longestValue = keys
    .map((v) => obj[v]!)
    .reduce((a, b) => (a.length > b.length ? a : b));

  return keys.map(
    (key) =>
      `${key.replace(/_/g, " ").padStart(longestKey.length + 1)}: ${`${obj[
        key
      ]!}`.padEnd(longestValue.length + 1)}`
  );
}
formatValues({ p: "string" });
