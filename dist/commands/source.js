"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const fetchCommand_1 = require("../functions/fetchCommand");
const getFileExtension_1 = require("../functions/getFileExtension");
module.exports = {
    name: "source",
    restrictions: {
        ownerOnly: true,
    },
    description: "get source of a file/command",
    usage: '<type: "command" | "file"> <target: string | Path>',
    cooldown: 1,
    async run(message, args) {
        switch (args[0]) {
            default:
                await message.channel.send("invalid type");
                break;
            case "command":
                const cmd = fetchCommand_1.fetchCommand(args.slice(1).join(" "));
                if (!cmd)
                    return await message.channel.send("Unknown Command");
                await message.channel.send(`Configuration: \`\`\`json\n${JSON.stringify(cmd, null, 2)}\`\`\``);
                await message.channel.send(cmd.run.toString(), {
                    code: "ts",
                    split: { char: "\n" },
                });
                break;
            case "file":
                var file;
                try {
                    file = fs_1.default.readFileSync(args.slice(1).join(" "));
                }
                catch (e) {
                    await message.channel.send(e, { code: "txt" });
                }
                if (!file)
                    return await message.channel.send("Unknown file");
                console.log(getFileExtension_1.getFileExtension(args.slice(1).join(" ")));
                await message.channel.send(file.toString(), {
                    code: args.slice(1).join(" ").split(".").pop(),
                    split: { char: "\n" },
                });
        }
    },
};
