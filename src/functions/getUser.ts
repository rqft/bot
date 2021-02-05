import { Message, User } from "discord.js";
import { client } from "..";

export async function getUser(message: Message, args: string[]) {
  var res = args.join(" ")?.normalize()!;

  if (res?.toLowerCase() == "discord") res = "643945264868098049";
  if (res?.toLowerCase() == "me") res = message.author.id;
  if (res?.toLowerCase() == "bot" || res?.toLowerCase() == "system")
    res = client.user?.id!;
  if (res?.toLowerCase() == "random") {
    if (!message.guild) {
      return await message.channel.send(
        "You need to be in a server to run this!"
      );
    }
    res = message.guild.members.cache.random().id;
  }
  if (res?.toLowerCase() == "owner") {
    if (!message.guild) {
      return await message.channel.send(
        "You need to be in a server to run this!"
      );
    }
    res = message.guild.ownerID;
  }
  var unresolvedID = args.join(" ").length ? res : message.author.id;
  if (res.match(/<@!?(\d+)>/g)?.length !== 0)
    unresolvedID = res.replace(/[<@!>]/g, "");
  var user: User | null = null;
  try {
    user = client.users.cache.find(
      (e) =>
        e.username.toLowerCase().normalize() == unresolvedID ||
        e.tag.toLowerCase().normalize() == unresolvedID ||
        e.id == unresolvedID ||
        `${e}` == unresolvedID ||
        message.guild?.members.cache.get(e.id)?.nickname == unresolvedID
    )!;
  } catch (error) {}
  if (!user) {
    return await message.channel.send("Unknown User");
  }
  return user;
}
