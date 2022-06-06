import { BaseSlashSubCommand } from "../baseslash";
export declare class SearchImageSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../../tools/format/search").Search.image;
}
