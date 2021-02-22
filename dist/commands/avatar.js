"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatID_1 = require("../functions/formatID");
const getUser_1 = require("../functions/getUser");
const sizes = [16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
module.exports = {
    name: "avatar",
    aliases: ["av"],
    description: "get a users avatar",
    usage: "[user: User | Snowflake] [size: AvatarSize]",
    async run(message, args) {
        const size = args[1] ? parseInt(args[1]) : 128;
        if (!sizes.includes(size))
            return await message.reply(`You can't choose this! Valid options are: ${sizes
                .map((e) => `\`${e}\``)
                .join(", ")}`);
        const user = await getUser_1.getUser(message, args, false);
        if (!user) {
            return await message.reply("Unknown User");
        }
        const res = await message.reply("<a:IconGui_Typing:798624244351107092>");
        const avURL = user.avatarURL({ dynamic: true, size: size }) ??
            user.defaultAvatarURL;
        await message.reply(`Avatar of ${user.tag} ${formatID_1.formatID(user.id)}
${avURL}`);
        await res.delete();
    },
};
