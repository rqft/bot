export function limit(s: string, limit: number) {
  return `${s.slice(0, limit)}${s.length > limit ? "..." : ""}`;
}
