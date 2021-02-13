import { Guild, Message } from "discord.js";
import { client } from "..";

export async function getGuild(
  message: Message,
  args: string[],
  useJoin: boolean = false
) {
  var res = useJoin
    ? args.join(" ")?.normalize()!
    : args[0]?.normalize()! ?? (message.guild ? "here" : "0");
  if (!res.length && !message.guild) return null;
  if (res == "here" && message.guild) res = message.guild.id;
  if (res?.toLowerCase() == "random") res = client.guilds.cache.random().id;
  var unresolvedID = res.length ? res.toLowerCase() : message.guild!.id;
  if (!unresolvedID) return;
  var guild: Guild | null = null;
  try {
    guild =
      client.guilds.cache.find((u) => {
        return (
          u.name.toLowerCase().includes(unresolvedID) ||
          unresolvedID.replace(/\D/g, "") == u.id ||
          (!!u.vanityURLCode && unresolvedID == u.vanityURLCode.toLowerCase())
        );
      })! ?? (await client.guilds.fetch(unresolvedID));
  } catch (error) {}
  return guild;
}
