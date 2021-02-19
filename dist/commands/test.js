"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("..");
const tests = ["error"];
module.exports = {
    name: "test",
    description: "TESTING",
    restrictions: {
        ownerOnly: true,
    },
    usage: "<test: Test>",
    async run(message, args) {
        switch (args[0]?.toLowerCase()) {
            case "error":
                if (!args[1])
                    return await message.channel.send("You need to specify a message");
                __1.client.emit("error", {
                    message: args.slice(1).join(" "),
                    name: `Error at [${this.name}]`,
                    stack: `from #${message.channel instanceof discord_js_1.GuildChannel
                        ? message.channel.name
                        : `a DM`} by ${message.author.tag}`,
                });
                await message.react("\u2705");
                break;
            case "embed":
                if (!args[1])
                    return await message.channel.send("you need to supply a valid embed");
                await message.channel.send("", {
                    embed: JSON.parse(args.slice(1).join(" ")),
                });
                await message.react("\u2705");
                break;
            case "setpresence":
                if (!args[1])
                    return await message.channel.send("you need to supply a valid presence");
                await __1.client.user?.setPresence(JSON.parse(args.slice(1).join(" ")));
                await message.react("\u2705");
                break;
            default:
                return await message.channel.send(`Unknown test. Valid tests are ${tests
                    .map((e) => `\`${e}\``)
                    .join(", ")}`);
        }
    },
};
