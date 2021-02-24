import { client } from "..";
import { color, TerminalColor } from "../types/TerminalColors";
export function makeConsoleDeployMessage() {
  const message = [
    `[${color(
      new Date().toLocaleString(),
      TerminalColor.bright.BRIGHT_BLACK
    )}]`,
    `Logged in as ${color(
      client.user?.tag,
      TerminalColor.normal.BLUE
    )} [${color(client.user?.id, TerminalColor.bright.BRIGHT_BLACK)}]`,
    ``,
    `Fetching ${color(
      client.guilds.cache.size,
      TerminalColor.format.BOLD
    )} Guilds...`,

    client.guilds.cache
      .array()
      .map(
        (e) =>
          `✅ Deployed to ${color(e.name, TerminalColor.normal.GREEN).padEnd(
            60
          )} [${color(e.id, TerminalColor.bright.BRIGHT_BLACK)}] as ${color(
            e.me?.displayName,
            TerminalColor.normal.RED
          ).padStart(32)} \n-- (${color(
            `${e.members.cache.size} members`,
            TerminalColor.bright.BRIGHT_BLACK
          )}) (${color(
            "owned by " + e.owner?.user.tag,
            TerminalColor.bright.BRIGHT_BLACK
          )})`
      )
      .join("\n")
      .replace(/\n{2}/gm, "\n"),
    color(`ready`, TerminalColor.normal.CYAN),
  ];
  console.log(message.join("\n"));
}
