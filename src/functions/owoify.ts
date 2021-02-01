export function owoify(s: string) {
  return s.replace(/[lr]/g, "w").replace(/[LR]/g, "W");
}
