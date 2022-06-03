import { CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";
export default class PxlJpegCommand extends BaseCommand {
    constructor(client: CommandClient);
    run: typeof import("../../../tools/format/pxl").Pxl.jpeg;
}
