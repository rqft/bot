"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
module.exports = {
    name: "publish",
    async run(message, args) {
        child_process_1.exec(`npm run p/publish ${args.join(" ")}`);
        await message.channel.send(":white_check_mark: Deployed @ https://github.com/arcy-at/Hallucinate");
    },
};
