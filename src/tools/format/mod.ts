import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Member } from "detritus-client/lib/structures";
import { Err } from "../error";
import { editOrReply } from "../tools";

export module Mod {
  export interface BanArgs {
    target: Member;
    reason?: string;
    days?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  }

  export async function ban(
    context: Context | InteractionContext,
    args: BanArgs
  ) {
    if (
      !context.member!.canBanMembers ||
      !context.member!.canEdit(args.target)
    ) {
      throw new Err("Missing Permissions", { status: 403 });
    }

    await args.target.ban({
      deleteMessageDays: String(args.days || 0),
      reason: args.reason,
    });

    return await editOrReply(context, `ok, banned ${args.target.tag}`);
  }
}
