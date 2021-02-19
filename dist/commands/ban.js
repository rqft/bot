"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getUser_1 = require("../functions/getUser");
const makeCodeblock_1 = require("../functions/makeCodeblock");
module.exports = {
    name: "ban",
    restrictions: {
        permissions: ["BAN_MEMBERS"],
        guildOnly: true,
    },
    usesArgs: true,
    description: "ban someone",
    usage: "<user: User> [reason: string]",
    async run(message, args) {
        const target = await getUser_1.getUser(message, args, false, 0);
        if (!target)
            return await message.channel.send("You need to supply a **bannable** user!");
        const reason = args[1] ? args.slice(1).join(" ") : undefined;
        if (message.guild?.member(target) &&
            !message.guild.member(target)?.bannable)
            return await message.channel.send("You need to supply a **bannable** user!");
        await message.guild?.members.ban(target, {
            reason: reason,
            days: 1,
        });
        await message.channel.send(`Banned ${target} ${reason ? `with reason: ${makeCodeblock_1.makeCodeblock(reason, 20)}` : ""}`);
    },
};
