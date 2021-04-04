import fetch from "node-fetch";
import { ICommand } from "../../interfaces/ICommand";
import { Secrets } from "../../secrets";
async function is_eval(
  script: string,
  inject: object = {}
): Promise<[boolean, string | Buffer, Headers | null]> {
  const res = await fetch("https://fapi.wrmsr.io/image_script", {
    method: "POST",
    body: JSON.stringify({ args: { inject, text: script } }),

    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${Secrets.Key.fAPI}`,
    },
  });

  if (!res.ok) return [false, await res.text(), null];
  // @ts-ignore
  return [true, await res.buffer(), res.headers];
}
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
    const background = Image.new(formula.width + 64, formula.height + 64, 0xFFFFFFFF);
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
