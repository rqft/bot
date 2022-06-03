import { BaseSlashSubCommand } from "../baseslash";
export declare class TagGetSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../../tools/format/tag").Tag.get;
}
