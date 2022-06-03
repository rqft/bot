import { InteractionContext } from "detritus-client/lib/interaction";
import { BaseContextMenuMessageCommand, ContextMenuMessageArgs } from "./basemessage";
export default class UserSlashCommand extends BaseContextMenuMessageCommand {
    name: string;
    run(context: InteractionContext, args: ContextMenuMessageArgs): Promise<import("detritus-client/lib/structures").Message | null>;
}
