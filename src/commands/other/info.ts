import { client } from "../..";
import { ICommand } from "../../interfaces/ICommand";
module.exports = {
  name: "info",
  async run(message, _args) {
    var ram: { [s: string]: any } = process.memoryUsage();
    for (const key in ram) {
      ram[key] = Math.trunc(ram[key] / 1000);
    }

    await message.reply(`Current Bot Info
\`\`\`py
# Counts
${client.channels.cache.size} Channels
${client.emojis.cache.size} Emojis
${client.guilds.cache.size} Servers
${client.users.cache.size} Users (${
      client.users.cache.filter((e) => !e.bot).size
    } non-bots)
\`\`\`
\`\`\`py
# Memory
${ram.arrayBuffers} Array Buffers
${Math.trunc(ram.external / 1000)} MB external data
${Math.trunc(ram.heapUsed / 1000)} MB used / ${Math.trunc(
      ram.heapTotal / 1000
    )} MB total memory
${Math.trunc(ram.rss / 1000)} MB RSS data
\`\`\``);
  },
} as ICommand;
