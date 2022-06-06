import { CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";
export default class SearchWebCommand extends BaseCommand {
    constructor(client: CommandClient);
    run: typeof import("../../../tools/format/search").Search.web;
}
