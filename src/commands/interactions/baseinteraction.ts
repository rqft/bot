import { Interaction } from "detritus-client";
import {
  InteractionCallbackTypes,
  MessageFlags,
} from "detritus-client/lib/constants";
import {
  CommandRatelimitInfo,
  CommandRatelimitMetadata,
  InteractionContext,
} from "detritus-client/lib/interaction";
import { expandMs } from "../../functions/tools";

export class BaseInteraction<
  ParsedArgsFinished = Interaction.ParsedArgs
> extends Interaction.InteractionCommand<ParsedArgsFinished> {
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
    // check perms to maybe force as ephemeral, just in case
    return context.respond(
      InteractionCallbackTypes.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE
    );
  }
  onRunError(
    context: InteractionContext,
    _args: ParsedArgsFinished,
    error: Error
  ) {
    return context.editOrRespond({
      content: `❌ An error occurred: ${error.message}`,
      flags: MessageFlags.EPHEMERAL,
    });
  }
  onRatelimit(
    context: InteractionContext,
    ratelimits: Array<CommandRatelimitInfo>,
    metadata: CommandRatelimitMetadata
  ) {
    const messages: Array<string> = [];
    for (const { ratelimit, remaining } of ratelimits) {
      let noun: string = "You are";
      switch (ratelimit.type) {
        case "channel":
          noun = "This channel is";
          break;
        case "guild":
          noun = "This guild is";
          break;
        case "user":
          noun = "You are";
          break;
      }
      let content: string;
      if (metadata.global) {
        content = `${noun} using commands too fast, wait ${expandMs(
          remaining
        )}`;
      } else {
        content = `${noun} using ${this.fullName} too fast, wait ${expandMs(
          remaining
        )}`;
      }
      messages.push(`❌ ${content}`);
    }
    if (messages.length) return context.editOrRespond(messages.join("\n"));
  }
}
