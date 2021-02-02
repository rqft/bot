"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
module.exports = {
    name: "publish",
    restrictions: {
        ownerOnly: true,
    },
    usesArgs: true,
    usage: "<message: text>",
    async run(message, args) {
        child_process_1.exec("git add .");
        await child_process_1.exec(`git commit -m "${args.join(" ")}"}`, (_, stdout, _stderr) => {
            message.channel.send(`\`\`\`git commit -m "${args.join(" ")}"\`\`\`\`\`\`cmd
${[stdout, _stderr].join("\n\n")}\`\`\``);
        });
    },
};
