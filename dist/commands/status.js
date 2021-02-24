"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const moment_1 = __importDefault(require("moment"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const capitalizeWords_1 = require("../functions/capitalizeWords");
module.exports = {
    name: "status",
    description: "get discord status",
    usage: "",
    usesArgs: false,
    async run(msg) {
        const ret = await msg.reply("<a:IconGui_Typing:798624244351107092>");
        try {
            const { channel } = msg;
            const { incidents } = await (await node_fetch_1.default("https://discordstatus.com/api/v2/incidents.json")).json();
            await ret.delete();
            if (!incidents)
                return channel
                    .send("Could not get Discord status. Please visit <https://discordstatus.com>.")
                    .catch((_e) => { });
            const latest = incidents[0];
            if (!latest)
                return channel.send("No active incidents.").catch((_e) => { });
            const { status, started_at, resolved_at, name, impact, incident_updates, components, shortlink, } = latest;
            if (resolved_at && moment_1.default().diff(resolved_at, "hours") >= 6)
                return channel.send("No active incidents.").catch((_e) => { });
            channel
                .send(new discord_js_1.MessageEmbed({
                title: `${name}`,
                url: `${shortlink}`,
                footer: { text: "discordstatus.com" },
                color: getColor(status),
                description: `Status: **${capitalizeWords_1.capitalizeWords(status).replace("_", " ")}**\nImpact: **${capitalizeWords_1.capitalizeWords(impact).replace("_", " ")}**\n\nAffects: ${components
                    .map((x) => `**${x.name}**`)
                    .join(", ")}`,
                fields: incident_updates
                    .map((x) => {
                    const { status, body, created_at } = x;
                    return {
                        name: `${capitalizeWords_1.capitalizeWords(status)} - ${moment_1.default(created_at).fromNow()}`,
                        value: body,
                    };
                })
                    .slice(0, 10),
                timestamp: moment_1.default(started_at).toDate(),
            }))
                .catch((_e) => { });
        }
        catch (e) {
            try {
                const { channel } = msg;
                channel
                    .send("Could not get Discord status. Please visit <https://discordstatus.com>.")
                    .catch((_e) => { });
            }
            catch (e) { }
        }
    },
};
function getColor(status) {
    switch (status) {
        case "resolved":
        case "completed":
            return "GREEN";
        case "in_progress":
        case "monitoring":
            return "YELLOW";
        case "investigating":
            return "ORANGE";
        case "identified":
            return "RED";
        default:
            return "BLUE";
    }
}
