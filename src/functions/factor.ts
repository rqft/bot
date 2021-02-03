import { api } from "./api";

export async function factor(query: string) {
  const url = "https://newton.now.sh/api/v2/factor/";
  return (await api(url + encodeURIComponent(query))).result;
}
