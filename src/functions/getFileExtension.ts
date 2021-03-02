export function getFileExtension(url: string, useDot: boolean = true) {
  const res = (url = url.substr(1 + url.lastIndexOf("/")).split("?")[0]!)
    .split("#")[0]!
    .substr(url.lastIndexOf("."))
    .trim();
  return useDot ? res : res.replace(/\./g, "");
}
