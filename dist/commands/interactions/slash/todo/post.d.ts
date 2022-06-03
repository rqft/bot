import { BaseSlashSubCommand } from "../baseslash";
export declare class TodoPostSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../../tools/format/todo").Todo.post;
}
