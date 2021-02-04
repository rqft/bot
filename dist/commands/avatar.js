"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const getFileExtension_1 = require("../functions/getFileExtension");
const getLongAgo_1 = require("../functions/getLongAgo");
const sizes = [16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
module.exports = {
    name: "avatar",
    aliases: ["av"],
    usage: "[user: User | Snowflake] [size: AvatarSize]",
    async run(message, args) {
        const size = args[1] ? parseInt(args[1]) : 128;
        if (!sizes.includes(size))
            return await message.channel.send(`You can't choose this! Valid options are: ${sizes
                .map((e) => `\`${e}\``)
                .join(", ")}`);
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
        const avURL = user.avatarURL({ dynamic: true, size: size }) ??
            user.defaultAvatarURL;
        const r = await message.channel.send(`Here you go! (size: \`${size}\`x\`${size}\`) (Done in ${getLongAgo_1.simpleGetLongAgo(message.createdTimestamp - 10)})`, {
            files: [
                {
                    name: `item.${getFileExtension_1.getFileExtension(avURL)}`,
                    attachment: avURL,
                },
            ],
        });
        r.edit(`${r.content} (${r.attachments.array()[0]?.size / 1000} KB)`);
        await res.delete();
    },
};
