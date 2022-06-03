import { BaseSlashSubCommand } from "../baseslash";
export declare class ImageSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../../tools/format/info.image").image;
}
