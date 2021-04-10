import { DMChannel, TextChannel } from "discord.js";
import { replacer } from "../../functions/replacer";
import { search_guildMember } from "../../functions/searching/guildMember";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "clean",
  restrictions: {
    level: 50,
    botPermissions: ["MANAGE_MESSAGES", "MANAGE_CHANNELS"],
    permissions: ["MANAGE_MESSAGES", "MANAGE_CHANNELS"],
  },
  args: [
    {
      name: "type",
      required: true,
      type: "string",
    },
    {
      name: "count",
      required: true,
      type: "number",
    },
  ],
  async run(message, args) {
    const valid = ["user", "bots", "images", "here", "me"];
    const type = args[0]?.toLowerCase()!;
    if (!valid.includes(type))
      return await reply(
        message,
        `Invalid sub-command. Try: ${valid.join(", ")}`
      );
    const count = parseInt(args[1]!);
    if (isNaN(count))
      return reply(message, messages.commands.admin.clean.invalid_count);
    if (count > 100)
      return reply(message, messages.commands.admin.clean.too_many_msgs);
    if (message.channel instanceof DMChannel) return;
    switch (type) {
      case "here": {
        await message.channel.messages
          .fetch({
            limit: count,
            before: message.id,
          })
          .then(() => {
            (message.channel as TextChannel).bulkDelete(count, true);
          })
          .catch((e) => {
            if (e)
              return reply(message, messages.commands.admin.clean.failed_clean);
          });
        await reply(
          message,
          replacer(messages.commands.admin.clean.cleaned_messages_all, [
            ["{COUNT}", count],
          ])
        );
        break;
      }
      case "bots": {
        await message.channel.messages
          .fetch({
            limit: count,
            before: message.id,
          })
          .then((messages) => {
            const userMessages = messages.filter(
              (message) => message.author.bot
            );
            return (message.channel as TextChannel).bulkDelete(
              userMessages,
              true
            );
          })
          .catch((e) => {
            if (e)
              return reply(message, messages.commands.admin.clean.failed_clean);
          });
        await reply(
          message,
          replacer(messages.commands.admin.clean.cleaned_messages_bots, [
            ["{COUNT}", count],
          ])
        );
        break;
      }
      case "me": {
        await message.channel.messages
          .fetch({
            limit: count,
            before: message.id,
          })
          .then((messages) => {
            const userMessages = messages.filter(
              (msg) => msg.author.id == message.author.id
            );
            return (message.channel as TextChannel).bulkDelete(
              userMessages,
              true
            );
          })
          .catch((e) => {
            if (e)
              return reply(message, messages.commands.admin.clean.failed_clean);
          });
        await reply(
          message,
          replacer(messages.commands.admin.clean.cleaned_messages_self, [
            ["{COUNT}", count],
          ])
        );
        break;
      }
      case "user": {
        if (!args[2]) return await reply(message, "you need to supply a user");
        const target = await search_guildMember(args[2]!, message.guild!);
        if (!target)
          return await reply(
            message,
            messages.targeting.not_found.guild_member
          );
        await message.channel.messages
          .fetch({
            limit: count,
            before: message.id,
          })
          .then((messages) => {
            const userMessages = messages.filter(
              (msg) => msg.author.id == target.id
            );
            return (message.channel as TextChannel).bulkDelete(
              userMessages,
              true
            );
          })
          .catch((e) => {
            if (e)
              return reply(message, messages.commands.admin.clean.failed_clean);
          });
        await reply(
          message,
          replacer(messages.commands.admin.clean.cleaned_messages_self, [
            ["{COUNT}", count],
          ])
        );
        break;
      }
      case "images": {
        await message.channel.messages
          .fetch({
            limit: 100,
            before: message.id,
          })
          .then((messages) => {
            const userMessages = messages.filter(
              (message) => message.attachments.size > 0
            );
            return (message.channel as TextChannel).bulkDelete(
              userMessages,
              true
            );
          })
          .catch((e) => {
            if (e)
              return reply(message, messages.commands.admin.clean.failed_clean);
          });
        await reply(
          message,
          replacer(messages.commands.admin.clean.cleaned_messages_images, [
            ["{COUNT}", count],
          ])
        );
        break;
      }
    }
  },
} as ICommand;
