import { Interaction, Structures } from "detritus-client";
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  MessageFlags,
} from "detritus-client/lib/constants";
import { Markup } from "detritus-client/lib/utils";
import { Parameters } from "../../functions/parameters";

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
          guildIds: [
            "816362327678779392",
            "760130247580057650",
            "759174794968301569",
          ],
          //   global: true,
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
export class BaseInteractionCommandOption<
  ParsedArgsFinished = Interaction.ParsedArgs
> extends Interaction.InteractionCommandOption<ParsedArgsFinished> {
  error = "Slash Command";
  type = ApplicationCommandOptionTypes.SUB_COMMAND;

  onCancelRun(
    context: Interaction.InteractionContext,
    _args: Record<string, any>
  ) {
    const command = Markup.codestring(context.name);
    return context.editOrRespond({
      content: `⚠ ${this.error} \`${command}\` error strangely, give me a report.`,
      flags: MessageFlags.EPHEMERAL,
    });
  }
}
export class BaseInteractionImageCommandOption<
  ParsedArgsFinished = Interaction.ParsedArgs
> extends Interaction.InteractionCommandOption<ParsedArgsFinished> {
  constructor(
    data: Interaction.InteractionCommandOptionOptions = {},
    as: string = "png"
  ) {
    super({
      ...data,
      options: [
        ...(data.options || []),
        {
          name: "image",
          description: "Some Image",
          label: "url",
          default: Parameters.imageUrl(as),
          value: Parameters.imageUrl(as),
        },
      ],
    });
  }

  onBeforeRun(
    context: Interaction.InteractionContext,
    args: { url?: null | string }
  ) {
    if (args.url) {
      context.metadata = Object.assign({}, context.metadata, {
        contentUrl: args.url,
      });
    }
    return !!args.url;
  }

  onCancelRun(
    context: Interaction.InteractionContext,
    args: { url?: null | string }
  ) {
    if (args.url === undefined) {
      return context.editOrRespond("cant find anything");
    } else if (args.url === null) {
      return context.editOrRespond("no image");
    }
    return super.onCancelRun!(context, args);
  }
}
