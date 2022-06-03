import { BaseSlashSubCommand } from "../baseslash";
export declare class ImageSpinSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../../tools/format/image").Image.spin;
}
