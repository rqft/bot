export function makeArrayDiff(current: any[], old: any[]) {
  return {
    added: current.filter((e) => !old.includes(e)).map((e) => `+ ${e}`),
    removed: old.filter((e) => !current.includes(e)).map((e) => `- ${e}`),
  };
}
