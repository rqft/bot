"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../tools/util");
const builder_1 = require("../wrap/builder");
exports.default = (0, builder_1.Command)("ls", {}, async (context) => {
    const emojis = await context.guild.fetchEmojis();
    const text = emojis.map((x) => `${x.name} = "${x.toString()}",`);
    await util_1.respond.fmt(context, "```\n{list}\n```", {
        list: text.slice(0, 25).join("\n"),
    });
    await context.reply(`\`\`\`\n${text.slice(25).join("\n")}\n\`\`\``);
});
