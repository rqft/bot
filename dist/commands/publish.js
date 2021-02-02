"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
module.exports = {
    name: "publish",
    restrictions: {
        ownerOnly: true,
    },
    async run(message, args) {
        child_process_1.exec(`npm run p/publish ${args.join(" ")}`);
        await message.channel.send(`:white_check_mark: Published to https://github.com/arcy-at/Hallucinate with message\`${args.join(" ")}\``);
    },
};
