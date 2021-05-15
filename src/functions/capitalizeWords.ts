export const REMOVE_REGEX = /_/g;
export const CAPITALIZE_REGEX = /(^|[ ])./g;
export function capitalizeWords(s: string): string {
  return s
    .replace(REMOVE_REGEX, " ")
    .replace(CAPITALIZE_REGEX, (e) => e.toUpperCase());
}
export function removeCamelCase(s: string): string {
  return s
    .replace(/^./g, (m) => m.toUpperCase())
    .replace(/[A-Z]/g, " $&")
    .substr(1);
}
