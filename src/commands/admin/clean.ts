import { DMChannel, TextChannel } from "discord.js";
import { replacer } from "../../functions/replacer";
import { search_guildMember } from "../../functions/searching/guildMember";
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
    const valid = ["channel", "user", "bots", "images", "here", "me"];
    const type = args[0]?.toLowerCase()!;
    if (!valid.includes(type))
      return await message.reply(
        `Invalid sub-command. Try: ${valid.join(", ")}`
      );
    const count = parseInt(args[1]!);
    if (isNaN(count))
      return message.reply(messages.commands.admin.clean.invalid_count);
    if (count > 100)
      return message.reply(messages.commands.admin.clean.too_many_msgs);
    if (message.channel instanceof DMChannel) return;
    switch (type) {
      case "channel": {
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
              return message.channel.send(
                messages.commands.admin.clean.failed_clean
              );
          });
        await message.reply(
          replacer(
            messages.commands.admin.clean.cleaned_messages_all,
            new Map([["{COUNT}", count]])
          )
        );
        break;
      }
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
              return message.channel.send(
                messages.commands.admin.clean.failed_clean
              );
          });
        await message.reply(
          replacer(
            messages.commands.admin.clean.cleaned_messages_all,
            new Map([["{COUNT}", count]])
          )
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
              return message.channel.send(
                messages.commands.admin.clean.failed_clean
              );
          });
        await message.reply(
          replacer(
            messages.commands.admin.clean.cleaned_messages_bots,
            new Map([["{COUNT}", count]])
          )
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
              return message.channel.send(
                messages.commands.admin.clean.failed_clean
              );
          });
        await message.reply(
          replacer(
            messages.commands.admin.clean.cleaned_messages_self,
            new Map([["{COUNT}", count]])
          )
        );
        break;
      }

      case "user": {
        const target = await search_guildMember(args[2]!, message.guild!);
        if (!target)
          return await message.reply(messages.targeting.not_found.guild_member);
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
              return message.channel.send(
                messages.commands.admin.clean.failed_clean
              );
          });
        await message.reply(
          replacer(
            messages.commands.admin.clean.cleaned_messages_self,
            new Map([["{COUNT}", count]])
          )
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
              return message.channel.send(
                messages.commands.admin.clean.failed_clean
              );
          });
        await message.reply(
          replacer(
            messages.commands.admin.clean.cleaned_messages_images,
            new Map([["{COUNT}", count]])
          )
        );
        break;
      }
    }
  },
} as ICommand;
