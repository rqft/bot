"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getUser_1 = require("../functions/getUser");
const makeCodeblock_1 = require("../functions/makeCodeblock");
module.exports = {
    name: "ban",
    restrictions: {
        permissions: ["KICK_MEMBERS"],
        guildOnly: true,
    },
    usage: "<user: User> [reason: string]",
    async run(message, args) {
        const targetUser = await getUser_1.getUser(message, args, false, 0);
        if (!targetUser)
            return await message.channel.send("You need to supply a **kickable** user!");
        const member = message.guild?.member(targetUser);
        if (!member)
            return await message.channel.send("You need to supply a **kickable** user!");
        const reason = args[1] ? args.slice(1).join(" ") : undefined;
        if (!member.kickable)
            return await message.channel.send("You need to supply a **kickable** user!");
        await member.kick(reason);
        await message.channel.send(`Kicked ${targetUser} ${reason ? `with reason: ${makeCodeblock_1.makeCodeblock(reason, 20)}` : ""}`);
    },
};
