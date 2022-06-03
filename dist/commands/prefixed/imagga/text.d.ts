import { CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";
export default class ImaggaTextCommand extends BaseCommand {
    constructor(client: CommandClient);
    run: typeof import("../../../tools/format/imagga").Imagga.readText;
}
