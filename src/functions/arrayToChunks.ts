export function arrayToChunks(array: any[], chunk_size: number) {
  return (
    Array(Math.ceil(array.length / chunk_size))
      // @ts-ignore
      .fill()
      .map((_, index) => index * chunk_size)
      .map((begin) => array.slice(begin, begin + chunk_size))
  );
}
