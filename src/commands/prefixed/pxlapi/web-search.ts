import { Command, CommandClient } from "detritus-client";
import { APIs } from "pariah";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Paginator } from "../../../functions/paginator";
import { Secrets } from "../../../secrets";
import { BaseCommand, ToolsMetadata } from "../basecommand";
export interface PxlWebSearchArgs {
  query: string;
}
export default class PxlWebSearchCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "web-search",
      aliases: ["websearch", "search"],

      label: "query",
      type: "string",
      required: true,
      metadata: ToolsMetadata("Search the web", "?<query: string>"),
    });
  }
  async run(context: Command.Context, args: PxlWebSearchArgs) {
    const pxl = new APIs.PxlAPI.API(Secrets.Key.pxlAPI);

    const webSearch = await pxl.webSearch(
      args.query,
      APIs.PxlAPI.SafeSearch.STRICT
    );
    const [result] = webSearch;
    const { results } = result!;
    const paginator = new Paginator(context, {
      pageLimit: results.length,
      async onPage(page: number) {
        const embed = createBrandEmbed(Brand.PXL_API, context);
        const { title, url, description } = results[page - 1]!;
        embed.setTitle(title);
        embed.setUrl(url);
        embed.setDescription(description);
        return embed;
      },
    });

    return await paginator.start();
  }
}
