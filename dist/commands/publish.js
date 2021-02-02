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
        await child_process_1.exec(`git add.; git commit -m ${args.join(" ")}`, (_, stdout, _stderr) => {
            message.channel.send([stdout, _stderr].join("\n\n"), { code: "bash" });
        });
        await message.channel.send(":white_check_mark: Deployed @ https://github.com/arcy-at/Hallucinate");
    },
};
