"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetchCommand_1 = require("../functions/fetchCommand");
module.exports = {
    name: "source",
    restrictions: {
        ownerOnly: true,
    },
    cooldown: 1,
    async run(message, args) {
        const cmd = fetchCommand_1.fetchCommand(args.join(" "));
        if (!cmd)
            return await message.channel.send("Unknown Command");
        await message.channel.send(`\`\`\`json\n${JSON.stringify(cmd, null, 2)}\`\`\`\`\`\`ts
// This is code from the TypeScript compilier

${cmd.run.toString()}
\`\`\``);
    },
};
