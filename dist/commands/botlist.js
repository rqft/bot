"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const node_fetch_1 = __importDefault(require("node-fetch"));
const __1 = require("..");
const getUser_1 = require("../functions/getUser");
const globals_1 = require("../globals");
const greenTick = "<:yesTick:804175929995427861>";
const redTick = "<:noTick:804175930028720178>";
const grayTick = "<:maybe:801847909795627048>";
const links = [
    {
        name: "TopGG",
        url: `https://top.gg/bot/`,
        fetch: true,
    },
    {
        name: "Discord Bot List",
        url: `https://discordbotlist.com/bots/`,
        fetch: true,
    },
    {
        name: "Discord Bots",
        url: `https://discord.bots.gg/bots/`,
        fetch: true,
    },
    {
        name: "Bots On Discord",
        url: `https://bots.ondiscord.xyz/bots/`,
        fetch: true,
    },
    {
        name: "Discord Boats",
        url: `https://discord.boats/bot/`,
        fetch: true,
    },
    {
        name: "Bots For Discord",
        url: `https://botsfordiscord.com/bot/`,
        fetch: false,
    },
];
module.exports = {
    name: "botlist",
    usage: "[bot: User]",
    async run(message, args) {
        var user = (await getUser_1.getUser(message, args, true)) ?? __1.client.user;
        if (!user.bot)
            return await message.channel.send("that user is not a bot");
        let output = `${greenTick}: ${user} is on this bot list\n${redTick}: ${user} is not on this bot list\n${grayTick}: This bot list cannot be scanned\n\n`;
        for (let link of links) {
            if (link.fetch) {
                let res = await node_fetch_1.default(link.url + user.id);
                let ok = res.ok || res.redirected;
                output += `${ok ? greenTick : redTick} [${link.name}](${link.url}${user.id})\n`;
            }
            else {
                output += `${grayTick} [${link.name}](${link.url}${user.id})`;
            }
        }
        const emb = new discord_js_1.MessageEmbed();
        emb.setAuthor(user.tag, user.avatarURL({ dynamic: true }) ?? user.defaultAvatarURL);
        emb.setTitle(`Bot list links for ${user.username} (${user.id})`);
        emb.setDescription(output);
        emb.setColor(globals_1.Color.embed);
        await message.channel.send(emb);
    },
};
