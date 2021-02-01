import Discord from "discord.js";
import { client } from "../index";
import { config } from "./config";

export function logError(error: Error) {
  config.logs.commands.onError.keys.forEach((e) => {
    const ch = client.channels.cache.get(e) as Discord.TextChannel;
    ch.send(
      `:x: Error: \`\`\`ts
${error}
\`\`\``
    );
  });
}
