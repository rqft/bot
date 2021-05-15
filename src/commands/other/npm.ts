import { Command, CommandClient } from "detritus-client";
import libnpm from "libnpmsearch";
import { formatTimestamp } from "../../functions/formatTimestamp";
import { generateEmbed } from "../../functions/generateEmbedTemplate";
import { simpleGetLongAgo } from "../../functions/getLongAgo";
import { limit } from "../../functions/limit";
import { CustomError } from "../../globals";
import { BaseCommand } from "../basecommand";
export default class NpmCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "query",
      required: true,
      name: "npm",
      args: [
        {
          name: "page",
          type: Number,
          default: 1,
        },
      ],
    });
  }
  async run(context: Command.Context, args: Command.ParsedArgs) {
    const list = await libnpm(args.query);
    if (!list.length) throw new CustomError("No results found");

    const page = list[(args.page ?? 1) - 1] ?? list[0]!;
    const embed = generateEmbed({
      user: context.user,
      otherText: [`(${args.page ?? 1}/${list.length})`],
    });
    embed.setTitle(`${page.name} v${page.version}`);
    embed.setUrl(
      `https://www.npmjs.com/package/${encodeURIComponent(page.name)}`
    );
    const desc = [];
    if (page.date)
      desc.push(
        `*Published ${simpleGetLongAgo(+page.date)} ago* ${formatTimestamp(
          page.date
        )}`
      );
    if (page.description) desc.push(limit(page.description, 1500));
    embed.setDescription(desc.join("\n"));
    if (page.keywords)
      embed.addField(
        "Keywords",
        page.keywords
          .map((v) => v.split(" "))
          .flat(1)
          .map(
            (v) =>
              `[\`${v}\`](https://www.npmjs.com/search?q=keywords:${encodeURIComponent(
                v
              )})`
          )
          .join(", ")
      );
    if (page.maintainers && page.maintainers[0]) {
      embed.setAuthor(page.maintainers[0].username);
      embed.addField(
        "Maintained By",
        page.maintainers
          .map((v) => `[${v.username}](sendto:${v.email})`)
          .join(", ")
      );
    }

    context.editOrReply({ embed });
  }
}
