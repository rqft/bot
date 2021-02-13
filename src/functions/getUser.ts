import { Message, User } from "discord.js";
import { client } from "..";

export async function getUser(
  message: Message,
  args: string[],
  useJoin: boolean = false
) {
  var res =
    (useJoin ? args.join(" ")?.normalize()! : args[0]?.normalize()!) ??
    message.author.id;
  if (res?.toLowerCase() == "discord") res = "643945264868098049";
  if (res?.toLowerCase() == "me" || res?.toLowerCase() == "self")
    res = message.author.id;
  if (["client", "system", "bot"].includes(res.toLowerCase()))
    res = client.user?.id!;
  if (res?.toLowerCase() == "random") {
    if (!message.guild) {
      return null;
    }
    res = message.guild.members.cache.random().id;
  }
  if (res?.toLowerCase() == "owner") {
    if (!message.guild) {
      return null;
    }
    res = message.guild.ownerID;
  }
  var unresolvedID = args.join(" ").length
    ? res.toLowerCase()
    : message.author.id;
  var user: User | null = null;
  try {
    user =
      client.users.cache.find((u) => {
        return (
          u.username.toLowerCase().includes(unresolvedID) ||
          unresolvedID.replace(/\D/g, "") == u.id ||
          unresolvedID == u.tag.toLowerCase()
        );
      })! ?? (await client.users.fetch(unresolvedID));
  } catch (error) {}
  return user;
}
