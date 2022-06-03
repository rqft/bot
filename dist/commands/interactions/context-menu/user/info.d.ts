import { BaseContextMenuUserCommand } from "./baseuser";
export default class UserSlashCommand extends BaseContextMenuUserCommand {
    name: string;
    run: typeof import("../../../../tools/format/info.user").user;
}
