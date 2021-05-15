import { Command, CommandClient } from "detritus-client";
import { Image } from "imagescript";
import fetch from "node-fetch";
import { generateEmbed } from "../../functions/generateEmbedTemplate";
import { pushPullImage } from "../../functions/pushPullImage";
import { CustomError } from "../../globals";
import { BaseCommand } from "../basecommand";
export default class ImageCommandTest extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tex",
      label: "query",
      required: true,
      type: String,
    });
  }
  async run(context: Command.Context, args: Command.ParsedArgs) {
    const options = {
      formula: args.query,
      fsize: "99px",
      color: "ffffff",
      mode: 0,
      out: 1,
      errors: 1,
      remhost: "quicklatex.com",
      preamble:
        "\\usepackage{amsmath}\n\\usepackage{amsfonts}\n\\usepackage{amssymb}",
      rnd: Math.random() * 100,
    };
    const res = await fetch("https://quicklatex.com/latex3.f", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: Object.entries(options)
        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
        .join("&"),
    });
    if (!res.ok) throw new CustomError("An error occured");
    const resTxt = await res.text();
    if (parseInt(resTxt.split("\n")[0]!) < 0)
      return await context.editOrReply(
        `\`\`\`txt\n${resTxt.split("\n").slice(2, Infinity).join("\n")}\`\`\``
      );
    const url = resTxt.split("\n")[1]!.split(/\s/)[0];
    const formula = await Image.decode(await (await fetch(url!)).buffer());
    const background = new Image(formula.width + 64, formula.height + 64)
      .composite(formula, 32, 32)
      .invert();
    const image = await pushPullImage(
      Buffer.from(await background.encode()),
      "latex.png"
    );
    const embed = generateEmbed({ user: context.user }).setImage(image);
    context.editOrReply({ embed });
  }
}
