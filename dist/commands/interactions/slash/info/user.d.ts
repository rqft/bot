import { BaseSlashSubCommand } from "../baseslash";
export declare class UserSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../../tools/format/info.user").user;
}
