import { CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";
export default class PxlThonkifyCommand extends BaseCommand {
    constructor(client: CommandClient);
    run: typeof import("../../../tools/format/pxl").Pxl.thonkify;
}
