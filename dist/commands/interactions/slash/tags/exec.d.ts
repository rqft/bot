import { BaseSlashSubCommand } from "../baseslash";
export declare class TagExecSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../../tools/format/tag").Tag.exec;
}
