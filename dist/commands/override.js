"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrides = void 0;
const getLongAgo_1 = require("../functions/getLongAgo");
const parseTimeString_1 = require("../functions/parseTimeString");
const globals_1 = require("../globals");
exports.overrides = {
    adm: {
        name: "--ov-admin",
        permissions: "ADMINISTRATOR",
    },
    mngserver: {
        name: "--ov-manage-server",
        permissions: "MANAGE_GUILD",
    },
    mngchannels: {
        name: "--ov-manage-channels",
        permissions: "MANAGE_CHANNELS",
    },
    logs: {
        name: "--ov-logs",
        permissions: "VIEW_AUDIT_LOG",
    },
    roles: {
        name: "--ov-roles",
        permissions: "MANAGE_ROLES",
    },
    msgs: {
        name: "--ov-messages",
        permissions: "MANAGE_MESSAGES",
    },
    nick: {
        name: "--ov-nicknames",
        permissions: ["CHANGE_NICKNAME", "MANAGE_NICKNAMES"],
    },
    bans: {
        name: "--ov-bans",
        permissions: ["BAN_MEMBERS"],
    },
};
module.exports = {
    name: "override",
    aliases: ["ov"],
    restrictions: {
        ownerOnly: true,
        guildOnly: true,
    },
    description: "for dev use; lets them override permissions for testing purposes",
    usage: "<override: devOverride>",
    usesArgs: true,
    async run(message, args) {
        const time = args[0] ?? "3m";
        if (args[0] == "clear") {
            message.member?.roles.cache.forEach((e) => {
                if (e.name.startsWith("--ov-"))
                    e.delete();
            });
            return await message.reply(`${"\u2705"} Cleared`);
        }
        const override = args.slice(1).join(" ").toLowerCase();
        const ms = parseTimeString_1.parseTimeString(time);
        if (ms < 500)
            return await message.reply("Must be higher than 500 milliseconds / Invalid Time String");
        if (!Object.keys(exports.overrides).includes(override))
            return await message.reply(`${"\u26A0\uFE0F"} Unknown Override, available options are ${Object.keys(exports.overrides)
                .map((e) => `\`${e}\``)
                .join(", ")}`);
        const ovRole = exports.overrides[override];
        const role = await message.guild?.roles.create({
            name: ovRole?.name,
            permissions: ovRole?.permissions,
            color: globals_1.Color.embed,
        });
        await message.member?.roles.add(role);
        await message.reply(`${"\u2705"} Gave you \`${ovRole?.name}\` override for ${getLongAgo_1.simpleGetLongAgo(Date.now() - ms)}`);
        setTimeout(async () => {
            await role?.delete();
            try {
                await message.react("\u23F2\uFE0F");
            }
            catch (_) {
                await message.channel.lastMessage?.react("\u23F2\uFE0F");
            }
        }, ms);
    },
};
