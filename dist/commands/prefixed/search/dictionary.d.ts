import { CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";
export default class SearchDictionaryCommand extends BaseCommand {
    constructor(client: CommandClient);
    run: typeof import("../../../tools/format/search").Search.define;
}
