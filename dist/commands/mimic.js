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
    async run(message, args) {
        const user = await getUser_1.getUser(message, args, false);
        if (!user)
            return;
        const msg = args.slice(1).join(" ").split("-hide ").join(" ");
        if (args.slice(1).join(" ").startsWith("-hide"))
            await message.delete();
        if (!msg)
            return await message.channel.send("You need to provide a message");
        const wh = await message.channel.createWebhook(user.username, {
            avatar: user.avatarURL() ?? user.defaultAvatarURL,
        });
        await wh.send(msg);
        await wh.delete();
    },
};
