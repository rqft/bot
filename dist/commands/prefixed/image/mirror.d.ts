import { CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";
export default class ImageMirrorCommand extends BaseCommand {
    constructor(client: CommandClient);
    run: typeof import("../../../tools/format/image").Image.mirror;
}
