import { BaseSlashCommand } from "../baseslash";
import { ChannelSlashSubCommand } from "./channel";
import { EmojiSlashSubCommand } from "./emoji";
import { GuildSlashSubCommand } from "./guild";
import { ImageSlashSubCommand } from "./image";
import { RoleSlashSubCommand } from "./role";
import { UserSlashSubCommand } from "./user";
export default class InfoSlashCommandGroup extends BaseSlashCommand {
  name = "info";
  description = "info";
  constructor() {
    super({
      options: [
        new ChannelSlashSubCommand(),
        new UserSlashSubCommand(),
        new EmojiSlashSubCommand(),
        new ImageSlashSubCommand(),
        new RoleSlashSubCommand(),
        new GuildSlashSubCommand(),
      ],
    });
  }
}
