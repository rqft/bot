"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("..");
const config_1 = require("../config");
const capitalizeWords_1 = require("../functions/capitalizeWords");
const getLongAgo_1 = require("../functions/getLongAgo");
const globals_1 = require("../globals");
module.exports = {
    name: "help",
    description: "List all of my commands or info about a specific command.",
    aliases: ["commands", "c", "?"],
    usage: "[command: string]",
    run(message, args) {
        const emb = new discord_js_1.MessageEmbed();
        const data = [];
        const prefix = config_1.config.bot.prefixes[0];
        if (!args[0]) {
            data.push(`My prefixes are: ${config_1.config.bot.prefixes
                .join(", ")
                .replace(/\?|\\/g, "")}`);
            data.push(`Here's a list of all my commands:`);
            const cmds = __1.commands.map((command) => command.name);
            data.push(cmds.join(", "));
            data.push(`\nYou can send "${prefix}help [command name]" to get info on a specific command!`);
            emb.setDescription(data.join("\n"));
            emb.setColor(globals_1.Color.hallucinate);
            emb.setAuthor("Help Menu", __1.client.user?.avatarURL() ?? __1.client.user?.defaultAvatarURL);
            return message.reply(emb);
        }
        const name = args[0].toLowerCase();
        const command = __1.commands.get(name) ||
            __1.commands.find((c) => c.aliases && c.aliases.includes(name));
        if (!command) {
            return message.reply("that's not a valid command!");
        }
        data.push(`${"\uD83D\uDCDB"} **Name:** \`${command.name}\``);
        if (command.aliases)
            data.push(`${"\uD83D\uDD24"} **Aliases:** ${command.aliases
                .map((e) => `\`${e}\``)
                .join(", ")}`);
        if (command.description)
            data.push(`${"\uD83D\uDCDD"} **Description:** \`${command.description}\``);
        if (command.usage)
            data.push(`${"\uD83D\uDCD5"} **Usage:** \`${prefix?.replace(/\\/g, "")}${command.name} ${command.usage}\``);
        if (command.cooldown) {
            data.push(`${"\u23F2\uFE0F"} **Cooldown**: ${getLongAgo_1.simpleShortGetLongAgo(Date.now() - command.cooldown * 1000)}`);
        }
        if (Object.keys(command.restrictions).length &&
            command.restrictions) {
            const rest = [];
            if (command.restrictions.guildOnly)
                rest.push("`Guild Only`");
            if (command.restrictions.ownerOnly)
                rest.push("`Bot Owner Only`");
            if (command.restrictions.serverOwnerOnly)
                rest.push("`Owner Only`");
            if (command.restrictions.permissions)
                rest.push(`Needs Permissions: ${command.restrictions.permissions
                    .map((e) => `\`${capitalizeWords_1.capitalizeWords(e.toLowerCase().replace(/_/g, " "))}\``)
                    .join(", ")}`);
            data.push(`${"\uD83D\uDC6E"} **Restrictions**: ${rest.join("\n")}`);
        }
        emb.setDescription(data);
        emb.setColor(globals_1.Color.hallucinate);
        emb.setAuthor("Help Menu", __1.client.user?.avatarURL() ?? __1.client.user?.defaultAvatarURL);
        message.reply(emb);
    },
};
