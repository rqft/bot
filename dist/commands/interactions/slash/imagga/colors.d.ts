import { BaseSlashSubCommand } from "../baseslash";
export declare class ImaggaColorsSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../../tools/format/imagga").Imagga.colors;
}
