import { BaseSlashCommand } from "./baseslash";
export default class SlashPingCommand extends BaseSlashCommand {
    name: string;
    description: string;
    run: typeof import("../../../tools/format/other").ping;
}
