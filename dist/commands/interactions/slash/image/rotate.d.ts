import { BaseSlashSubCommand } from "../baseslash";
export declare class ImageRotateSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../../tools/format/image").Image.rotate;
}
