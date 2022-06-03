import { BaseSlashSubCommand } from "../baseslash";
export declare class TodoListSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../../tools/format/todo").Todo.list;
}
