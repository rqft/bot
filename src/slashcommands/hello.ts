import {
  CommandContext,
  CommandOptionType,
  Message,
  SlashCommand,
  SlashCreator,
} from "slash-create";

module.exports = class HelloCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      guildIDs: "775743191441735712",
      name: "hihi",
      description: "lol",
      options: [
        {
          type: CommandOptionType.USER,
          name: "good_morning",
          description: "hi hi",
        },
      ],
    });
  }

  async run(ctx: CommandContext) {
    return ctx.send(`hi ${ctx.options.good_morning}`) as Promise<Message>;
  }
};
