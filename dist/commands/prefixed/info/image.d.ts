import { CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";
export default class InfoImageCommand extends BaseCommand {
    constructor(client: CommandClient);
    run: typeof import("../../../tools/format/info.image").image;
}
