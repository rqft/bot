export function pullCodeFromBlock(s: string) {
  return s.replace(/\`{3}\n?(.+)?\`{3}/g, "");
}
