"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getUser_1 = require("../functions/getUser");
module.exports = {
    name: "mimic",
    usage: "<user: User> <message: text>",
    usesArgs: true,
    restrictions: {
        guildOnly: true,
    },
    cooldown: 10,
    description: "mimic people",
    async run(message, args) {
        const user = await getUser_1.getUser(message, args, false);
        if (!user)
            return await message.channel.send("unknown user");
        const msg = args.slice(1).join(" ").split("-d ").join(" ");
        if (args.slice(1).join(" ").startsWith("-d"))
            await message.delete();
        if (!msg)
            return await message.channel.send("You need to provide a message");
        const name = message.guild?.members.cache.get(user.id)
            ? message.guild.members.cache.get(user.id)?.displayName ?? user.username
            : user.username;
        const wh = await message.channel.createWebhook(name, {
            avatar: user.avatarURL() ?? user.defaultAvatarURL,
        });
        await wh.send(msg, { files: message.attachments.array() });
        await wh.delete();
    },
};
