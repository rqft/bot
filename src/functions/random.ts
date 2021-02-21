export function random(source: any[]) {
  return source[~~(Math.random() * source.length)];
}
