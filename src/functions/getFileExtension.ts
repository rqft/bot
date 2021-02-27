export function getFileExtension(url: string) {
  return (url = url.substr(1 + url.lastIndexOf("/")).split("?")[0]!)
    .split("#")[0]!
    .substr(url.lastIndexOf("."))
    .trim();
}
