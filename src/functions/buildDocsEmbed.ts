import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import { Color } from "../globals";
import { AlgoliaResult, Kind, Results } from "../interfaces/IPylonDocs";
const url =
  "https://4iuxqlhenh-dsn.algolia.net/1/indexes/*/queries?x-algolia-api-key=4cfe00690d1880ca0e048c58a88dfd1a&x-algolia-application-id=4IUXQLHENH";
export async function lookup(
  query: string,
  page?: number
): Promise<AlgoliaResult> {
  const request = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      requests: [
        {
          indexName: "pylon-docs-prod",
          params: "query=" + encodeURIComponent(query) + "&page=" + (page || 0),
        },
      ],
    }),
  });

  return request.json();
}
export function buildDocsEmbed(
  data: AlgoliaResult,
  maxResults: number = 10
): MessageEmbed {
  const [result]: Results[] = data.results!;
  //   console.log(result);
  const desc =
    result!.hits
      .slice(0, maxResults)
      .map((x) => {
        const text = x.path.replace(new RegExp(result!.query, "gi"), "**$&**");
        // @ts-ignore
        return `${Kind[x.kind]}[${text.slice(0, 50)}${
          text.length > 50 ? "..." : ""
        }](${x.url})`;
      })
      .join("\n")
      .replace(/_/g, "\\$&") ?? "⛔ No results found.";
  return new MessageEmbed()
    .setTitle(
      `:mag: Search results for: ${result!.query} | Page ${result!.page + 1}`
    )
    .setColor(Color.pylon)
    .setDescription(desc)
    .setFooter(
      `Processing time: ${result!.processingTimeMS}ms ${
        result!.hits.length > maxResults
          ? `| ${result!.hits.length - maxResults} results not shown`
          : ""
      }`
    )
    .setThumbnail(
      "https://cdn.discordapp.com/emojis/648961590527524874.png?v=1"
    );
}
