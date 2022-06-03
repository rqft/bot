import { CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";
export default class InfoChannelCommand extends BaseCommand {
    constructor(client: CommandClient);
    run: typeof import("../../../tools/format/info.channel").channel;
}
