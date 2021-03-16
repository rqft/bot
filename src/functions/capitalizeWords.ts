export function capitalizeWords(s: string) {
  return s.replace(/(^| )./g, (e) => e.toUpperCase());
}
