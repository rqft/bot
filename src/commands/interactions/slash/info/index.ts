import { BaseSlashCommand } from "../baseslash";
import { ChannelSlashSubCommand } from "./channel";
import { UserSlashSubCommand } from "./user";
export default class InfoSlashCommandGroup extends BaseSlashCommand {
    name = "info";
    description = "info";
    constructor() {
        super({
            options: [
                new ChannelSlashSubCommand(),
                new UserSlashSubCommand(),
            ],
        });
    }
}