import { BaseSlashCommand } from "./baseslash";
export default class DefineSlashCommand extends BaseSlashCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../tools/format/other").define;
}
