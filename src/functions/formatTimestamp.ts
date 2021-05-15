export function formatTimestamp(date: Date | number | string) {
  return `**[**\`${new Date(date).toLocaleDateString()}\`**]**`;
}
