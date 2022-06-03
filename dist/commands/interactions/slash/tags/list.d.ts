import { BaseSlashSubCommand } from "../baseslash";
export declare class TagListSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    run: typeof import("../../../../tools/format/tag").Tag.list;
}
