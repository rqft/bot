import { BaseSlashSubCommand } from "../baseslash";
export declare class RoleSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../../tools/format/info.role").role;
}
