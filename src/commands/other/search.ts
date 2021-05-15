import { Command, CommandClient } from "detritus-client";
import fetch from "node-fetch";
import { formParams } from "../../functions/formParams";
import { generateEmbed } from "../../functions/generateEmbedTemplate";
import { CustomError, wolframAlphaShortResponseCache } from "../../globals";
import { Secrets } from "../../secrets";
import { BaseCommand } from "../basecommand";
export default class SearchCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "query",
      name: "search",
      required: true,
      args: [
        {
          name: "units",
          type: String,
          choices: ["metric", "imperial"],
          default: "metric",
        },
      ],
    });
  }
  async run(context: Command.Context, args: Command.ParsedArgs) {
    const res = await context.editOrReply("ok, searching");
    var text = wolframAlphaShortResponseCache.get(args.query);
    if (!text) {
      const base = "http://api.wolframalpha.com/v1/result?";
      const params: Record<string, number | string> = {
        i: args.query,
        appid: Secrets.Key.wolframAlpha,
        units: args.units,
      };
      var str = formParams(params);

      const request = await fetch(base + str);
      if (!request.ok)
        throw new CustomError(
          "Something went wrong while grabbing search results"
        );

      text = await request.text();
    }
    if (text === "Wolfram|Alpha did not understand your input")
      throw new CustomError("Unable to understand input");
    wolframAlphaShortResponseCache.set(args.query, text);
    const emb = generateEmbed({
      user: context.user,
      start: res.createdAtUnix,
    })
      .setDescription(text)
      .setAuthor(args.query);
    context.editOrReply({ embed: emb });
  }
}
