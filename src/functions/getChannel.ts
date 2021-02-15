import { GuildChannel, Message } from "discord.js";

export function getChannel(
  message: Message,
  args: string[],
  useJoin: boolean = false,
  argument: number = 0
) {
  var res = (useJoin ? args.join(" ") : args[argument])?.normalize()!;
  if (!res) res = message.channel.id;
  if (res?.toLowerCase() == "here") res = message.channel.id;
  if (res?.toLowerCase() == "random") {
    if (!message.guild) {
      return null;
    }
    res = message.guild.channels.cache.random().id;
  }
  var unresolvedID = args.join(" ").length ? res : message.author.id;
  if (res.match(/<@!?(\d+)>/g)?.length !== 0)
    unresolvedID = res.replace(/[<@!>]/g, "");
  var channel: GuildChannel | null = null;
  try {
    channel = message.guild?.channels.cache.find(
      (e) =>
        e.name.toLowerCase().normalize() == unresolvedID ||
        e.id == unresolvedID ||
        `${e}` == unresolvedID ||
        message.guild?.members.cache.get(e.id)?.nickname == unresolvedID
    )!;
  } catch (error) {}
  return channel;
}
