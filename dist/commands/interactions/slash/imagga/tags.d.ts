import { BaseSlashSubCommand } from "../baseslash";
export declare class ImaggaTagsSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../../tools/format/imagga").Imagga.tags;
}
