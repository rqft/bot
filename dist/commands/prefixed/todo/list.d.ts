import { CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";
export default class TodoGetCommand extends BaseCommand {
    constructor(client: CommandClient);
    run: typeof import("../../../tools/format/todo").Todo.list;
}
