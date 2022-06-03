import { BaseSlashSubCommand } from "../baseslash";
export declare class PxlLegoSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../../tools/format/pxl").Pxl.lego;
}
