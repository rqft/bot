import { CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";
export default class TodoPostCommand extends BaseCommand {
    constructor(client: CommandClient);
    run: typeof import("../../../tools/format/todo").Todo.post;
}
