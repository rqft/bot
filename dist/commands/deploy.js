"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
module.exports = {
    name: "deploy",
    restrictions: {
        ownerOnly: true,
    },
    async run(message) {
        child_process_1.exec(`npm run p/deploy`);
        await message.channel.send(":white_check_mark: Deployed @ https://github.com/arcy-at/Hallucinate");
    },
};
