"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const getFileExtension_1 = require("../functions/getFileExtension");
const getLongAgo_1 = require("../functions/getLongAgo");
module.exports = {
    name: "avatar",
    aliases: ["av"],
    usage: "[user]",
    async run(message, args) {
        if (args[0]?.toLowerCase() == "discord")
            args[0] = "643945264868098049";
        if (args[0]?.toLowerCase() == "me")
            args[0] = message.author.id;
        if (args[0]?.toLowerCase() == "bot" || args[0]?.toLowerCase() == "system")
            args[0] = __1.client.user?.id;
        if (args[0]?.toLowerCase() == "random") {
            if (!message.guild) {
                return await message.channel.send("You need to be in a server to run this!");
            }
            args[0] = message.guild.members.cache.random().id;
        }
        var unresolvedID = args[0]
            ? args[0]?.replace(/\D/g, "")
            : message.author.id;
        var user = null;
        try {
            user = await __1.client.users.fetch(unresolvedID, true);
        }
        catch (error) {
            return await message.channel.send(error);
        }
        if (!user)
            return;
        const res = await message.channel.send("...");
        const avURL = user.avatarURL({ dynamic: true, size: 4096 }) ?? user.defaultAvatarURL;
        await message.channel.send(`Here you go! (Done in ${getLongAgo_1.simpleGetLongAgo(message.createdTimestamp)})`, {
            files: [
                {
                    name: `item.${getFileExtension_1.getFileExtension(avURL)}`,
                    attachment: avURL,
                },
            ],
        });
        await res.delete();
    },
};
