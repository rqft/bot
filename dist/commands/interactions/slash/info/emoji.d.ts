import { BaseSlashSubCommand } from "../baseslash";
export declare class EmojiSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../../tools/format/info.emoji").emoji;
}
