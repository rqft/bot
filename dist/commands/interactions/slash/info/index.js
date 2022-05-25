"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseslash_1 = require("../baseslash");
const channel_1 = require("./channel");
const emoji_1 = require("./emoji");
const image_1 = require("./image");
const role_1 = require("./role");
const user_1 = require("./user");
class InfoSlashCommandGroup extends baseslash_1.BaseSlashCommand {
    name = "info";
    description = "info";
    constructor() {
        super({
            options: [
                new channel_1.ChannelSlashSubCommand(),
                new user_1.UserSlashSubCommand(),
                new emoji_1.EmojiSlashSubCommand(),
                new image_1.ImageSlashSubCommand(),
                new role_1.RoleSlashSubCommand(),
            ],
        });
    }
}
exports.default = InfoSlashCommandGroup;
