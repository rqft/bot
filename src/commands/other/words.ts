import fs from "fs";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
const cc = fs.readFileSync("words.txt", "utf8");

module.exports = {
  module: "other",
  name: "words",
  restrictions: {
    level: 0,
  },
  args: [
    {
      name: "sort",
      required: true,
      type: "string",
    },
    {
      name: "query",
      required: true,
      type: "text",
    },
  ],
  async run(message, args) {
    const query = args.slice(1).join(" ");
    const reg = new RegExp(query, "gi");
    const sorts = new Map([
      ["normal", null],
      [
        "most",
        (a: string, b: string) =>
          (b.match(reg) ?? []).length - (a.match(reg) ?? []).length,
      ],
      [
        "least",
        (a: string, b: string) =>
          (a.match(reg) ?? []).length - (b.match(reg) ?? []).length,
      ],
      ["longest", (a: string, b: string) => b.length - a.length],
      ["shortest", (a: string, b: string) => a.length - b.length],
    ]);
    const fn = sorts.get(args[0]?.toLowerCase()!);
    if (fn === undefined)
      return await reply(
        message,

        "invalid sort type, valid types are: " +
          Array.from(sorts.keys())
            .map((k) => `\`${k}\``)
            .join(" ")
      );

    const words = cc
      .split("\n")
      .sort(fn ?? undefined)
      .sort((a, b) => {
        if (!a.startsWith(query) && b.startsWith(query)) return 1;
        if (a.startsWith(query) && !b.startsWith(query)) return -1;
        return a.localeCompare(b);
      });
    await reply(
      message,

      words
        .filter((e) => e.includes(query))
        .map((e) => e.replace(reg, "__**$&**__"))
        .slice(0, 50)
        .join(", "),
      { split: { char: " " } }
    );
  },
} as ICommand;
