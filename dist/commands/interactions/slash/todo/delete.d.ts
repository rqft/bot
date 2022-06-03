import { BaseSlashSubCommand } from "../baseslash";
export declare class TodoDeleteSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../../tools/format/todo").Todo.remove;
}
