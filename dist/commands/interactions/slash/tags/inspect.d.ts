import { BaseSlashSubCommand } from "../baseslash";
export declare class TagInspectSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    run: typeof import("../../../../tools/format/tag").Tag.inspect;
}
