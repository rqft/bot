import { CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";
export default class DefineCommand extends BaseCommand {
    constructor(client: CommandClient);
    run: typeof import("../../../tools/format/other").define;
}
