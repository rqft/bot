import { CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";
export default class PxlSonicCommand extends BaseCommand {
    constructor(client: CommandClient);
    run: typeof import("../../../tools/format/pxl").Pxl.sonic;
}
