import { Message, Role } from "discord.js";

export function getRole(
  message: Message,
  args: string[],
  useJoin: boolean = false,
  argument: number = 0
) {
  if (!message.guild) return null;
  var unresolvedID = (useJoin
    ? args.slice(argument).join(" ").toLowerCase()
    : args[argument]?.toLowerCase())!.length
    ? args.slice(argument).join(" ").toLowerCase()
    : message.member?.roles.highest.id;
  var role: Role | undefined | null = null;
  try {
    role = message.guild!.roles.cache.find(
      (e) =>
        e.name.toLowerCase().includes(unresolvedID!) ||
        e.id.replace(/\D/g, "") == unresolvedID
    );
  } catch (error) {}
  return role;
}
