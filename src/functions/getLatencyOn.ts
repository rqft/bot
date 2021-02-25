export async function getLatencyOn(cb: (...any: any[]) => Promise<any>) {
  const s = Date.now();
  await cb();
  return Date.now() - s;
}
