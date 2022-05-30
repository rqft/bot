import { InteractionContext } from "detritus-client/lib/interaction";
import { BaseSlashCommand } from "./baseslash";

export default class SlashPingCommand extends BaseSlashCommand {
  name = "ping";
  description = "pingy ping";

  async run(context: InteractionContext): Promise<unknown> {
    return await context.editOrRespond(
      `came back in ${Date.now() - context.interaction.createdAtUnix}ms`
    );
  }
}
