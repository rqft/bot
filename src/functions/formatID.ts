export function formatID(id: string, hide: boolean = true) {
  const spoiler = hide ? "||" : "";
  return `**[**${spoiler}\`${id}\`${spoiler}**]**`;
}
