import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import { CustomEmojis } from "../../enums/customEmojis";
import { Emojis } from "../../enums/emojis";
import { Color } from "../../globals";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
import { ICronTask, IDeploy } from "../../interfaces/IPylon";
import { Secrets } from "../../secrets";
module.exports = {
  name: "pylonapi",
  args: [
    // {
    //   type: "string",
    //   name: "type",
    //   required: true,
    // },
  ],
  async run(message, args) {
    const reqinit = {
      headers: {
        authorization: Secrets.Key.pylon,
      },
    };
    switch (args[0]) {
      case "code":
        const id = args[1];
        if (!id) return await reply(message, "you need a deployment id");
        const dreq = await (
          await fetch(`https://pylon.bot/api/deployments/${id}`, reqinit)
        ).json();
        const files = JSON.parse(dreq.script.project).files;
        const atts: { name: string; attachment: Buffer }[] = [];
        files.forEach((file: any) => {
          atts.push({
            name: file.path.replace(/\//, "").replace(/\//g, "_"),
            attachment: Buffer.from(file.content),
          });
        });

        const res = await message.reply(
          `here you go!
        
        
*This will be deleted in 15 seconds*`,
          {
            files: atts.slice(0, 10),
          }
        );
        setTimeout(() => {
          res.delete();
        }, 15000);
        break;
      case "guilds":
        const greq = (await (
          await fetch(`https://pylon.bot/api/user/guilds`, reqinit)
        ).json()) as { name: string; id: string; icon?: string }[];
        await reply(
          message,

          new MessageEmbed({
            title: "Available Pylon guilds",
            description: greq
              .map((e) => `\`${e.name.padEnd(40)}\` (${e.id})`)
              .join("\n"),
            color: Color.embed,
          })
        );
        break;
      default:
        if (!message.guild?.members.cache.has("270148059269300224"))
          return await reply(message, "pylon is not authorized on this server");
        const req = await fetch(
          `https://pylon.bot/api/guilds/${message.guild.id}`,
          reqinit
        );
        const stats = await fetch(
          `https://pylon.bot/api/guilds/${message.guild.id}/stats`,
          reqinit
        ).then((e) => e.json());

        const data = await req.json();
        const emb = new MessageEmbed();
        emb.setAuthor(
          message.guild.name,
          "https://cdn.discordapp.com/attachments/798610127648456744/816575485177888769/9e0eebeb511f110f28c0f901467c8620.webp"
        );
        emb.setThumbnail(message.guild.iconURL({ dynamic: true })!);
        emb.setTitle(`Info for Pylon Deployments`);
        const deploys = (data.deployments as IDeploy[]).map((e) => {
          const conf = JSON.parse(e.config);
          const crons = conf.tasks.cronTasks as ICronTask[];
          return {
            name: `❯ ${e.name} (${e.id})`,
            value: `**${Emojis.PENCIL} Revision**: \`#${e.revision}\`
${Emojis.LINK} **URL**: [Editor](https://pylon.bot/studio/deployments/${
              e.id
            }/editor) | [Guild](https://pylon.bot/studio/guilds/${e.guild_id})
${
  crons && crons.length > 0
    ? `**${CustomEmojis.GUI_SLOWMODE} Crons**:
${crons.map((e) => `**${e.name}** - \`${e.cronString}\``).join("\n")}`
    : ""
}`,
          };
        });

        deploys.forEach((e) => emb.addField(e.name, e.value));
        const stat = stats[stats.length - 1];
        emb.addField(
          `❯ Stats (as of ${new Date(stat.date * 1000).toLocaleDateString()})`,
          `${Emojis.DESKTOP_COMPUTER} **CPU Time**: ${
            stat.cpuMs
          }ms (${(stat.cpuMsAvg as number).toPrecision(4)}ms average per event)
${Emojis.TIMER} **Execution Time**: ${
            stat.executionMs
          }ms (${(stat.executionMsAvg as number).toPrecision(
            4
          )}ms average per event)
${CustomEmojis.GUI_RICH_PRESENCE} **Events**: ${stat.events}
**❯ Requests**
**├╴ Discord Cache**: ${stat.discordCacheRequests ?? 0}
**├╴ Discord API**: ${stat.discordApiRequests ?? 0}
**└╴ Fetch Requests**: ${stat.fetchRequests ?? 0}
**❯ Other**
**├╴ KV Operations**: ${stat.kvOperations ?? 0}
**└╴ Host Function Calls**: ${stat.hostFunctionCalls ?? 0}`
        );

        await reply(message, emb);
        break;
    }
  },
} as ICommand;
