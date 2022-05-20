import {
  InteractionCallbackTypes,
  MessageFlags,
} from "detritus-client/lib/constants";
import {
  InteractionCommand,
  InteractionContext,
  ParsedArgs,
} from "detritus-client/lib/interaction";
import { BaseSet } from "detritus-utils";
import { Secrets } from "../../secrets";
import { Err } from "../../tools/error";
import { editOrReply, permissionsErrorList } from "../../tools/tools";

export class BaseInteraction<T = ParsedArgs> extends InteractionCommand<T> {
  error = "Command";
  guildIds = new BaseSet(Secrets.InteractionGuilds);
  global = this.guildIds.length === 0;

  onLoadingTrigger(context: InteractionContext) {
    if (context.responded) {
      return;
    }

    if (this.triggerLoadingAsEphemeral) {
      return context.respond(
        InteractionCallbackTypes.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
        { flags: MessageFlags.EPHEMERAL }
      );
    }

    return context.respond(
      InteractionCallbackTypes.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
    );
  }

  onDmBlocked(context: InteractionContext) {
    return context.editOrRespond(
      "hey you cant use this command in a dm !! go to a server instead :)"
    );
  }

  onCancelRun(context: InteractionContext) {
    return context.editOrRespond("something bad happened :(");
  }

  onPermissionsFailClient(context: InteractionContext, failed: Array<bigint>) {
    const permissions = permissionsErrorList(failed);
    return context.editOrRespond({
      content: `i need ${permissions.join(", ")} to run this`,
      flags: MessageFlags.EPHEMERAL,
    });
  }

  onPermissionsFail(context: InteractionContext, failed: Array<bigint>) {
    const permissions = permissionsErrorList(failed);
    return context.editOrRespond({
      content: `you need ${permissions.join(", ")} to run this`,
      flags: MessageFlags.EPHEMERAL,
    });
  }

  onRunError(context: InteractionContext, _args: T, error: Error | Err) {
    return editOrReply(context, {
      content: Err.from(error).toThrown(),
      flags: MessageFlags.EPHEMERAL,
    });
  }
}
