import { Message, Role } from "discord.js";

export function getRole(
  message: Message,
  args: string[],
  useJoin: boolean = false,
  argument: number = 0
) {
  if (!message.guild) return null;
  var unresolvedID = (useJoin ? args.join(" ") : args[argument])!.length
    ? args.join(" ")
    : message.member?.roles.highest.id;
  var role: Role | undefined | null = null;
  try {
    role = message.guild!.roles.cache.find(
      (e) =>
        e.name.toLowerCase().startsWith(unresolvedID!) ||
        e.id == unresolvedID ||
        `${e}` == unresolvedID
    );
  } catch (error) {}
  return role;
}
