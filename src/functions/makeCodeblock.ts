export function makeCodeblock(text: string, limit: number) {
  return text.length > limit ? `\`\`\`\n${text}\`\`\`` : `\`${text}\``;
}
