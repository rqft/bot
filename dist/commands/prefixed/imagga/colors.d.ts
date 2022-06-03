import { CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";
export default class ImaggaColorsCommand extends BaseCommand {
    constructor(client: CommandClient);
    run: typeof import("../../../tools/format/imagga").Imagga.colors;
}
