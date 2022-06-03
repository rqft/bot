import { BaseSlashSubCommand } from "../baseslash";
export declare class ImageResizeSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../../tools/format/image").Image.resize;
}
