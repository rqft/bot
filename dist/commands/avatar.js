"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatID_1 = require("../functions/formatID");
const getFileExtension_1 = require("../functions/getFileExtension");
const getLongAgo_1 = require("../functions/getLongAgo");
const getUser_1 = require("../functions/getUser");
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
        const user = await getUser_1.getUser(message, args, false);
        if (!user) {
            return await message.channel.send("Unknown User");
        }
        const res = await message.channel.send("...");
        const avURL = user.avatarURL({ dynamic: true, size: size }) ??
            user.defaultAvatarURL;
        const r = await message.channel.send(`Avatar of ${user.tag} ${formatID_1.formatID(user.id)}`, {
            files: [
                {
                    name: `item.${getFileExtension_1.getFileExtension(avURL)}`,
                    attachment: avURL,
                },
            ],
        });
        r.edit(`Avatar of ${user.tag} ${formatID_1.formatID(user.id)} (size: \`${size}\`x\`${size}\`) (Done in ${getLongAgo_1.simpleGetLongAgo(message.createdTimestamp - 10)}) (${r.attachments.array()[0]?.size / 1000} KB)`);
        await res.delete();
    },
};
