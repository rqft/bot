export function chunkify<T>(array: Array<T>, size: number): Array<Array<T>> {
  return Array(Math.ceil(array.length / size))
    .fill(undefined)
    .map((_, index) => index * size)
    .map((begin) => array.slice(begin, begin + size));
}
