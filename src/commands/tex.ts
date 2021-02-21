import fetch from "node-fetch";
import { is_eval } from "../functions/imagescript_eval";
import { pullCodeFromBlock } from "../functions/pullCodeFromBlock";
import { ICommand } from "../interfaces/ICommand";
import { CustomEmojis } from "../maps/customEmojis";
module.exports = {
  name: "latex",
  aliases: ["tex"],
  description: "render LaTeX code",
  usage: "<code: string>",
  async run(message, args) {
    const ret = await message.reply(CustomEmojis.GUI_TYPING);
    const query = pullCodeFromBlock(args.join(" "));
    const options = {
      formula: query,
      fsize: "48px",
      color: "000000",
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
    await ret.delete();
    if (!res.ok)
      return message.reply(
        `An error occurred: \`\`\`\n${await res.text()}\`\`\``
      );
    const resTxt = await res.text();
    if (parseInt(resTxt.split("\n")[0]!) < 0)
      return await message.reply(
        `${resTxt.split("\n").slice(2, Infinity).join("\n")}`,
        { code: "txt" }
      );
    const url = resTxt.split("\n")[1]!.split(/\s/)[0];
    const [ok, isres] = await is_eval(
      `
    const formula = Image.load(url);
    const background = Image.new(formula.width + 64, formula.height + 64, 0xffffffff);
    background.composite(formula, 32, 32);
    image = background
    `,
      { url }
    );
    if (!ok) return message.reply(isres as string);
    await message.reply(``, {
      files: [
        {
          name: "latex.png",
          attachment: isres as Buffer,
        },
      ],
    });
  },
} as ICommand;
