import { Command, CommandClient } from "detritus-client";
import { Locales } from "detritus-client/lib/constants";
import { APIs } from "pariah";
import { Brand } from "../../../enums/brands";
import { createImageEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { editOrReply } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ToolsMetadata } from "../basecommand";
export interface PxlScreenshotArgs {
  url: URL;
  browser: APIs.PxlAPI.ScreenshotBrowser;
  fullpage: boolean;
  theme: APIs.PxlAPI.ScreenshotTheme;
  locale: Locales;
}
export default class PxlScreenshotCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "screenshot",
      aliases: ["ss"],

      label: "url",
      type: Parameters.url,
      required: true,

      args: [
        {
          name: "browser",
          type: "string",
          choices: ["chromium", "firefox"],
          default: "chromium",
        },
        { name: "fullpage", type: "bool", default: "false" },
        {
          name: "theme",
          type: "string",
          default: "dark",
          choices: ["light", "dark"],
        },
        {
          name: "locale",
          type: "string",
          default: "en-US",
          choices: [...Object.values(Locales)],
        },
      ],
      metadata: ToolsMetadata(
        "Screenshot a webpage",
        "<url: URL> ?<-browser: chromium|firefox> ?<-fullpage: boolean=false> ?<-theme: light|dark=dark> ?<-locale: Locales=en-US>",
        [
          "rqft.space",
          "https://thowoee.me/",
          "https://thowoee.me/ -browser firefox",
        ]
      ),
    });
  }
  async run(context: Command.Context, args: PxlScreenshotArgs) {
    const pxl = new APIs.PxlAPI.API(Secrets.Key.pxlAPI);

    const screenshot = await pxl.screenshot(args.url.toString(), {
      browser: args.browser,
      fullPage: args.fullpage,
      locale: args.locale,
      theme: args.theme,
    });
    const embed = await createImageEmbed(
      context,
      screenshot,
      undefined,
      Brand.PXL_API
    );
    embed.setDescription(`URL: ${args.url}`);

    return await editOrReply(context, { embed });
  }
}
