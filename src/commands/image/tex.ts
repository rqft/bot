import { Image } from "imagescript";
import fetch from "node-fetch";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
module.exports = {
  name: "tex",
  args: [
    {
      name: "query",
      required: true,
      type: "text",
    },
  ],
  module: "utility",
  async run(message, args) {
    const query = args.join(" ").replace(/\`{3}\n?(.+)?/g, "");
    const options = {
      formula: query,
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
    if (!res.ok)
      return reply(
        message,
        `An error occurred: \`\`\`\n${await res.text()}\`\`\``
      );
    const resTxt = await res.text();
    if (parseInt(resTxt.split("\n")[0]!) < 0)
      return await reply(
        message,

        `${resTxt.split("\n").slice(2, Infinity).join("\n")}`,
        { code: "txt" }
      );
    const url = resTxt.split("\n")[1]!.split(/\s/)[0];

    const formula = await Image.decode(await (await fetch(url!)).buffer());
    const background = new Image(formula.width + 64, formula.height + 64)
      // .fill(
      // 0xffffffff
      // );
      .composite(formula, 32, 32)
      .invert();
    const image = Buffer.from(await background.encode());
    await reply(message, ``, {
      files: [
        {
          name: "latex.png",
          attachment: image,
        },
      ],
    });
  },
} as ICommand;
