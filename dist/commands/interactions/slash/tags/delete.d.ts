import { BaseSlashSubCommand } from "../baseslash";
export declare class TagDeleteSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../../tools/format/tag").Tag.remove;
}
