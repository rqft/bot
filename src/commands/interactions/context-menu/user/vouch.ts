import { MessageFlags } from "detritus-client/lib/constants";
import { InteractionContext } from "detritus-client/lib/interaction";
import { BaseSet } from "detritus-utils";
import { Err } from "../../../../tools/error";
import { editOrReply } from "../../../../tools/tools";
import { BaseContextMenuUserCommand, ContextMenuUserArgs } from "./baseuser";

export default class VouchMenuUserCommand extends BaseContextMenuUserCommand {
  name = "Vouch";
  guildIds = new BaseSet(["983638405932003388"]);

  async run(context: InteractionContext, args: ContextMenuUserArgs) {
    const vouchedId = "983646172520525876";

    if (!context.member || !context.member.roles.has(vouchedId)) {
      throw new Err("You are not vouched");
    }

    if (args.member) {
      if (args.member.roles.has(vouchedId)) {
        return new Err("This user has already been vouched for");
      }

      try {
        await args.member.addRole(vouchedId);
      } catch (e) {
        throw new Err(e);
      }

      return await editOrReply(context, {
        content: `Vouched for ${args.member.tag}`,
        flags: MessageFlags.EPHEMERAL,
      });
    }

    throw new Err("User is not in this server");
  }
}
