export function parseBlock(s: string, txtret: number = 400) {
  if (s.length > txtret) return `\`\`\`\n${s}\`\`\``;
  return `\`${s}\``;
}
