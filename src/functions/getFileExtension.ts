export function getFileExtension(url: string) {
  const match = url.match(/\..{3,4}\?/g);
  if (!match) return "";
  return match[0]?.replace(/[\.\?]/g, "");
}
