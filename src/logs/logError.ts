import Discord from "discord.js";
import { config } from "../config";
import { formatTimestamp } from "../functions/formatTimestamp";
import { client } from "../index";

export function logError(error: Error) {
  config.logs.commands.onError.keys.forEach((e) => {
    const ch = client.channels.cache.get(e) as Discord.TextChannel;
    ch.send(
      `${formatTimestamp(new Date())} :no_entry: Error: \`\`\`ts
${error.name}: ${error.message}
Stack: \`${error.stack}\`
\`\`\``
    );
  });
}
