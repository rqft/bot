export function numAccuracy(given: number, wanted: number) {
  return 100 - Math.abs(wanted - given) / wanted;
}
