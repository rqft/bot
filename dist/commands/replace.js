"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    name: "replace",
    usage: "<regex: RegExp> <flags: string> <replaceWith: string> <source: Text>",
    usesArgs: true,
    restrictions: {
        ownerOnly: true,
    },
    description: "replace text with regex",
    async run(message, args) {
        const reg = args[0];
        const flags = args[1];
        const replaceWith = args[2];
        const source = args.slice(3).join(" ");
        if (!reg || !flags || !replaceWith || !source) {
            return await message.channel.send(`:warning: Argument Error (missing argument)
\`\`\`
${this.usage}\`\`\``);
        }
        const regex = new RegExp(reg, flags);
        const t = source
            .replace(regex, "**$&**")
            .replace(/\*{4}/g, "")
            .replace(regex, replaceWith);
        await message.channel.send(t.slice(0, 1500) + (t.length > 1500 ? "..." : ""));
    },
};
