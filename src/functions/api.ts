import fetch from "node-fetch";

export async function api(
  url: string,
  type: "json" | "text" | "buffer" | "arrayBuffer" = "json"
) {
  const fetched = await fetch(url);
  switch (type) {
    case "arrayBuffer":
      return await fetched.arrayBuffer();
    case "buffer":
      return await fetched.buffer();
    case "json":
      return await fetched.json();
    case "text":
      return await fetched.text();
  }
}
