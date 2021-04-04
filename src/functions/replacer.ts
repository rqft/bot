export function replacer(base: string, replacers: [string, any][]) {
  for (const [key, value] of replacers) base = base.split(key).join(value);
  return base;
}
