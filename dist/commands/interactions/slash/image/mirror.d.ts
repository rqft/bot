import { BaseSlashSubCommand } from "../baseslash";
export declare class ImageMirrorSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../../tools/format/image").Image.mirror;
}
