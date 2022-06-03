import { CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";
export default class PxlGlitchCommand extends BaseCommand {
    constructor(client: CommandClient);
    run: typeof import("../../../tools/format/pxl").Pxl.glitch;
}
