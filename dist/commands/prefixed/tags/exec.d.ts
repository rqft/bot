import { CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";
export default class TagExecCommand extends BaseCommand {
    constructor(client: CommandClient);
    run: typeof import("../../../tools/format/tag").Tag.exec;
}
