"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const config_1 = require("../config");
module.exports = {
    on: "help",
    description: "List all of my commands or info about a specific command.",
    aliases: ["commands", "c", "?"],
    usage: "[command name]",
    run(message, args) {
        const data = [];
        const prefix = config_1.config.bot.prefixes[0];
        if (!args[0]) {
            data.push(`My prefixes are: ${config_1.config.bot.prefixes
                .join(", ")
                .replace(/\?|\\/g, "")}`);
            data.push("Here's a list of all my commands:");
            data.push(__1.commands.map((command) => command.name).join(", "));
            data.push(`\nYou can send "${prefix}help [command name]" to get info on a specific command!`);
            return message.channel.send(data, { split: true });
        }
        const name = args[0].toLowerCase();
        const command = __1.commands.get(name) ||
            __1.commands.find((c) => c.aliases && c.aliases.includes(name));
        if (!command) {
            return message.channel.send("that's not a valid command!");
        }
        data.push(`**Name:** ${command.on}`);
        if (command.aliases)
            data.push(`**Aliases:** ${command.aliases.join(", ")}`);
        if (command.description)
            data.push(`**Description:** ${command.description}`);
        if (command.usage)
            data.push(`**Usage:** ${prefix}${command.on} ${command.usage}`);
        message.channel.send(data, { split: true });
    },
};
