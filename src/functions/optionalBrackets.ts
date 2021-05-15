export function optionalBrackets(optional: boolean = false) {
  return !optional
    ? {
        left: "[",
        right: "]",
      }
    : {
        left: "<",
        right: ">",
      };
}
