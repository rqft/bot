import { CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";
export default class ImageUrlCommand extends BaseCommand {
    constructor(client: CommandClient);
    run: typeof import("../../../tools/format/image").Image.url;
}
