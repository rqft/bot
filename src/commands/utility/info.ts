import { client } from "../..";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
module.exports = {
  name: "info",
  async run(message, _args) {
    var ram = process.memoryUsage();
    for (const key in ram as any) {
      // @ts-ignore lol
      Math.round((ram[key] / 1024 / 1024) * 100) / 100;
    }
    (
      await reply(
        message,
        `Bot Stats
\`\`\`py
# Counts
${client.channels.cache.size} Channels
${client.emojis.cache.size} Emojis
${client.guilds.cache.size} Servers
${client.users.cache.size} Users
\`\`\`
\`\`\`py
# Memory
${ram.arrayBuffers} MB of Array Buffers
${ram.external} MB external data
${ram.heapUsed} MB used / ${ram.heapTotal} MB total memory
${ram.rss} MB RSS data
\`\`\`
Invite: https://arcy-at.github.io/bot`
      )
    )?.suppressEmbeds();
  },
} as ICommand;
