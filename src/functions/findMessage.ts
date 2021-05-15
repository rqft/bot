import { Context } from "detritus-client/lib/command";
import { Message } from "detritus-client/lib/structures";
import { BaseCollection } from "detritus-utils";
import { findGuild } from "./findGuild";

export async function findMessage(context: Context, query?: string) {
  if (context.message.referencedMessage)
    return context.message.referencedMessage;
  if (query) {
    const url = query
      .replace(/https:\/\/(canary.)?discord.com\/channels\//g, "")
      .split("/");
    if (!url[0]) return;
    const guild = findGuild(url[0]);
    if (!guild || !url[1]) return;

    const channel = guild.channels.find((v) => v.id === url[1] && v.isText);
    if (!channel || !url[2]) return;

    const messages: BaseCollection<string, Message> =
      await channel.fetchMessages({
        limit: 100,
      });
    return messages.find((v) => v.id === url[2]);
  }
}

export async function findMessageWithObject(context: Message, query?: string) {
  if (context.referencedMessage) return context.referencedMessage;
  if (query) {
    const url = query
      .replace(/https:\/\/(canary.)?discord.com\/channels\//g, "")
      .split("/");
    if (!url[0]) return;
    const guild = findGuild(url[0]);
    if (!guild || !url[1]) return;

    const channel = guild.channels.find((v) => v.id === url[1] && v.isText);
    if (!channel || !url[2]) return;

    const messages: BaseCollection<string, Message> =
      await channel.fetchMessages({
        limit: 100,
      });
    return messages.find((v) => v.id === url[2]);
  }
}

export async function findMessageNoContext(query?: string) {
  if (query) {
    const url = query
      .replace(/https:\/\/(canary.)?discord.com\/channels\//g, "")
      .split("/");
    if (!url[0]) return;
    const guild = findGuild(url[0]);
    if (!guild || !url[1]) return;

    const channel = guild.channels.find((v) => v.id === url[1] && v.isText);
    if (!channel || !url[2]) return;

    const messages: BaseCollection<string, Message> =
      await channel.fetchMessages({
        limit: 100,
      });
    return messages.find((v) => v.id === url[2]);
  }
}
