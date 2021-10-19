import { CommandClient } from "detritus-client/lib";
import {
  Command,
  CommandOptions,
  CommandRatelimit,
  CommandRatelimitItem,
  Context,
  FailedPermissions,
  ParsedArgs,
  ParsedErrors,
} from "detritus-client/lib/command";
import { CommandRatelimitTypes } from "detritus-client/lib/constants";
import { Message } from "detritus-client/lib/structures";
import { PermissionString } from "../enums/utils";
import {
  bitfieldToArray,
  capitalizeWords,
  simpleGetLongAgo,
  replacer,
  generateUsage,
} from "../functions/tools";
import { CustomError } from "../globals";
import { messages } from "../messages";
export class BaseCommand extends Command {
  constructor(client: CommandClient, options: CommandOptions) {
    super(
      client,
      Object.assign(
        {
          triggerTypingAfter: 1000,
          ratelimits: [
            { duration: 2500, limit: 3, type: "user" },
            { duration: 5000, limit: 10, type: "channel" },
            { duration: 10000, limit: 20, type: "guild" },
          ],
        },
        options
      )
    );
  }
  run(context: Context, _args: ParsedArgs = {}): Promise<void | Message> {
    return context.reply("❌ No functionality set for this command");
  }
  onError(context: Context, _args: ParsedArgs, error: any) {
    console.log(error);
    error instanceof CustomError
      ? context.editOrReply(`❌ \`${error.message}\``)
      : context.editOrReply(
          replacer(messages.error.command_failed, [["{ERROR}", error]])
        );
  }
  onRunError(context: Context, _args: ParsedArgs, error: any) {
    console.log(error);
    error instanceof CustomError
      ? context.editOrReply(`❌ \`${error.message}\``)
      : context.editOrReply(
          replacer(messages.error.error_running_command, [["{ERROR}", error]])
        );
  }
  onPermissionsFail(context: Context, permissions: FailedPermissions) {
    context.canReact ? context.message.react("⛔") : undefined;

    return context.editOrReply(
      replacer(messages.permissions.missing_permissions, [
        [
          "{PERMISSIONS}",
          `\`${permissions
            .map((v) => bitfieldToArray(v, PermissionString))
            .flat(1)
            .map((v) => capitalizeWords(v.toLowerCase()))
            .join(", ")}\``,
        ],
      ])
    );
  }
  onPermissionsFailClient(context: Context, permissions: FailedPermissions) {
    context.canReact ? context.message.react("⚠") : undefined;
    return context.editOrReply(
      replacer(messages.permissions.missing_permissions_me, [
        [
          "{PERMISSIONS}",
          `\`${permissions
            .map((v) => bitfieldToArray(v, PermissionString))
            .flat(1)
            .map((v) => capitalizeWords(v.toLowerCase()))
            .join(", ")}\``,
        ],
      ])
    );
  }

  onRatelimit(
    context: Context,
    ratelimits: Array<{
      item: CommandRatelimitItem;
      ratelimit: CommandRatelimit;
      remaining: number;
    }>,
    global: { global: boolean; now: number }
  ) {
    for (const rate of ratelimits) {
      var cause = "DMs";

      if (rate.ratelimit.type === CommandRatelimitTypes.USER)
        cause = context.user.mention;
      else if (rate.ratelimit.type === CommandRatelimitTypes.CHANNEL)
        cause = context.channel!.mention;
      else if (context.guild) cause = `\`${context.guild.name}\``;

      const command = global ? "commands" : `\`${context.command!.name}\``;
      const time = simpleGetLongAgo(Date.now() - rate.ratelimit.duration);
      const remaining = simpleGetLongAgo(Date.now() - rate.remaining);

      context.reply(
        replacer(
          messages.error.ratelimit[rate.ratelimit.type]! +
            messages.error.ratelimit.message,
          [
            ["{CAUSE}", cause],
            ["{COMMAND}", command],
            ["{COMMANDS}", rate.item.usages],
            ["{COMMANDS_MAX}", rate.ratelimit.limit],
            ["{TIME}", time],
            ["{REMAINING}", remaining],
          ]
        )
      );
    }
  }
  onTypeError(context: Context, _args: ParsedArgs, errors: ParsedErrors[]) {
    if (!context.command) return;
    const description = ["❌ Argument Errors:"];
    for (let key in errors)
      description.push(`\`${key}\`: ${errors[key].message}`);
    description.push(
      `Proper Usage:
\`\`\`lua\n${generateUsage(context.command)}\`\`\``
    );
    return context.editOrReply(description.join("\n"));
  }
}
