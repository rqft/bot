import { Interaction, Structures } from "detritus-client";
import { ApplicationCommandTypes } from "detritus-client/lib/constants";

export class BaseInteractionCommand<
  ParsedArgsFinished = Interaction.ParsedArgs
> extends Interaction.InteractionCommand<ParsedArgsFinished> {
  error = "Command";
  constructor(data: Interaction.InteractionCommandOptions) {
    super(
      Object.assign<
        Interaction.InteractionCommandOptions,
        Interaction.InteractionCommandOptions
      >(
        {
          //   guildIds: [
          //     "816362327678779392",
          //     "760130247580057650",
          //     "759174794968301569",
          //   ],
          global: true,
        },
        data
      )
    );
  }
}

export class BaseSlashCommand<
  ParsedArgsFinished = Interaction.ParsedArgs
> extends BaseInteractionCommand<ParsedArgsFinished> {
  error = "Slash Command";
  type = ApplicationCommandTypes.CHAT_INPUT;

  triggerLoadingAfter = 1000;
}
export interface ContextMenuMessageArgs {
  message: Structures.Message;
}

export class BaseContextMenuMessageCommand extends BaseInteractionCommand<ContextMenuMessageArgs> {
  error = "Message Context Menu";
  type = ApplicationCommandTypes.MESSAGE;

  global = true;
  permissionsIgnoreClientOwner = true;
  triggerLoadingAfter = 1000;
  triggerLoadingAsEphemeral = true;

  constructor(data: Interaction.InteractionCommandOptions = {}) {
    super(data);
  }
}
export interface ContextMenuUserArgs {
  member?: Structures.Member;
  user: Structures.User;
}

export class BaseContextMenuUserCommand extends BaseInteractionCommand<ContextMenuUserArgs> {
  error = "User Context Menu";
  type = ApplicationCommandTypes.USER;

  global = true;
  permissionsIgnoreClientOwner = true;
  triggerLoadingAsEphemeral = true;

  constructor(data: Interaction.InteractionCommandOptions = {}) {
    super(data);
  }
}
