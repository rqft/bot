import { TextChannel } from "discord.js";
import { client } from "..";
import { formatID } from "../functions/formatID";
import { formatTimestamp } from "../functions/formatTimestamp";

export function makeDeployMessage(pubChannels: string[]) {
  const message = [
    `${formatTimestamp(new Date())}`,
    `Logged in as ${client.user?.tag} ${formatID(client.user?.id!)}`,
    `\n`,
    `Fetching Guilds...`,
    client.guilds.cache
      .array()
      .map(
        (e) =>
          `✅ Deployed to \`${e.name.padEnd(60)}\` ${formatID(e.id)} (${
            client.user
          }) (${`\`owned by ${e.owner?.user.tag}\``})`
      )
      .join("\n"),
    "Ready!",
  ];
  pubChannels.forEach((e) => {
    const ch = client.channels.cache.get(e) as TextChannel;
    ch.send(message.join("\n"));
  });
}
