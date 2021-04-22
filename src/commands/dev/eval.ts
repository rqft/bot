import { Constants, Utils } from "detritus-client";
import { commands } from "../../globals";

commands.add({
  label: "code",
  name: "eval",
  args: [
    { default: false, name: "noreply", type: "bool" },
    { default: false, name: "verbose", type: "bool" },
    { default: 2, name: "jsonspacing", type: "number" },
  ],
  onBefore: (context) => context.user.isClientOwner,
  onCancel: (context) =>
    context.editOrReply(
      `${context.user.mention}, you're not this bot's owner or part of it's team.`
    ),
  run: async (context, args) => {
    const { matches } = Utils.regex(
      Constants.DiscordRegexNames.TEXT_CODEBLOCK,
      args.code
    );
    if (matches.length) {
      args.code = matches[0]?.text;
    }

    let language = "js";
    let message;
    try {
      message = await Promise.resolve(eval(args.code));
      if (typeof message === "object") {
        message = JSON.stringify(message, null, args.jsonspacing);
        language = "json";
      }
      if (args.verbose) context.message.react("✅");
    } catch (error) {
      if (args.verbose) context.message.react("❌");
      message = error ? error.stack || error.message : error;
    }
    const max = 1990 - language.length;
    if (!args.noreply) {
      return context.editOrReply(
        ["```" + language, String(message).slice(0, max), "```"].join("\n")
      );
    }
  },
  onError: (_context, _args, error) => {
    console.error(error);
  },
});
