"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
module.exports = {
    name: "test",
    async run(message, args) {
        const query = args.join(" ");
        child_process_1.exec(query, (_err, stdout, stderr) => {
            message.channel.send([query, stdout, stderr].map((e) => `\`\`\`\n${e}\`\`\``).join(""));
        });
    },
};
