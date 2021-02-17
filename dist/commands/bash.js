"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
module.exports = {
    name: "bash",
    aliases: ["shell", "ps"],
    restrictions: {
        ownerOnly: true,
    },
    usage: `<a: text>`,
    async run(message, args) {
        child_process_1.exec(args.join(" "), async (err, std, ste) => {
            if (err)
                return await message.channel.send(`\`\`\`
Error on ${err.cmd} (${err.code}) [${err.signal}]

${err.name}: ${err.message}
${err.stack}
\`\`\``);
            else
                message.channel.send(`\`\`\`\n${[std, ste].join("\n\n")}\`\`\``);
        });
    },
};
