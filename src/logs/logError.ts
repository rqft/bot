import Discord from "discord.js";
import { config } from "../config";
import { client } from "../index";

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
