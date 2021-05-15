import { Command, CommandClient } from "detritus-client";
import fetch from "node-fetch";
import { formParams } from "../../functions/formParams";
import { generateEmbed } from "../../functions/generateEmbedTemplate";
import { wolframAlphaFullResultsCache } from "../../globals";
import { messages } from "../../messages";
import { Secrets } from "../../secrets";
import { BaseCommand } from "../basecommand";
export default class PlotCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "query",
      name: "wa",
      required: true,
      args: [
        {
          name: "page",
          aliases: ["p"],
          type: Number,
        },
        {
          name: "mag",
          type: Number,
          default: 2,
        },
        {
          name: "location",
          aliases: ["ip", "longlat"],
          type: String,
          default: "Los Angeles, CA",
        },
        {
          name: "steps",
          default: true,
          type: Boolean,
        },
      ],
    });
  }
  async run(context: Command.Context, args: Command.ParsedArgs) {
    const res = await context.editOrReply("ok, calculating");
    const base = `http://api.wolframalpha.com/v2/query?`;
    const params: Record<string, number | string> = {
      input: args.query,
      appid: Secrets.Key.wolframAlpha,
      output: "json",
      format: "image",
      width: 1000,
      height: 1000,
      mag: args.mag,
      location: args.location,
    };
    if (args.steps) {
      params.input = "solve " + params.input;
      params.podstate = "Result__Step-by-step solution";
    }
    var str = formParams(params);
    var queryresult = wolframAlphaFullResultsCache.get(base + str);
    if (!queryresult) {
      const request = await fetch(base + str);
      if (!request.ok)
        await context.editOrReply(messages.commands.other.plot.something_wrong);
      queryresult = (await request.json()).queryresult;
      wolframAlphaFullResultsCache.set(base + str, queryresult);
    }
    if (queryresult.error)
      return await context.editOrReply(messages.commands.other.plot.error);
    if (!queryresult.numpods || !queryresult.pods || !queryresult.pods.length)
      return await context.editOrReply(messages.commands.other.plot.no_pods);
    queryresult.pods = queryresult.pods.filter((e: any) => e.id.toLowerCase());
    if (
      !queryresult.pods[0].subpods.length ||
      !queryresult.pods[0].subpods ||
      !queryresult.pods[0].subpods[0].img
    )
      return await context.editOrReply(messages.commands.other.plot.no_subpods);
    const _pages = (queryresult.pods as any[]).filter(
      (v) => v.scanner !== "Identity"
    );
    const pages = _pages
      .filter((v) => v.id.toLowerCase().includes("plot"))
      .concat(_pages.filter((p) => !p.id.toLowerCase().includes("plot")));
    const subPages = pages.map((v: { subpods: any }) => v.subpods).flat(1);

    var PAGE_LENGTH = 1;
    PAGE_LENGTH = PAGE_LENGTH > 10 ? 10 : PAGE_LENGTH;

    const plotMainPage = pages[(args.page ?? 1) - 1] ?? pages[0];
    const plotSubPage = subPages[(args.page ?? 1) - 1] ?? subPages[0];

    const emb = generateEmbed({
      user: context.user,
      otherText: [
        `${plotSubPage.img.width}x${plotSubPage.img.height}`,
        `(${args.page ?? 1}/${pages.length})`,
      ],
      start: res.createdAtUnix,
    });
    if (plotMainPage.title) emb.setTitle(plotMainPage.title);
    const data: string[] = [];
    data.push(plotSubPage.img.type);
    data.push(plotSubPage.img.alt);
    if (plotMainPage.infos && plotMainPage.infos.text)
      data.push(plotMainPage.infos.text);
    emb.setDescription(data.join("\n"));
    emb.setImage(plotSubPage.img.src);
    emb.setAuthor(args.query);

    context.editOrReply({ embed: emb });
  }
}
