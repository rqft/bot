import RPC from "discord-rpc";
import {
  Client,
  Collection,
  Guild,
  Intents,
  Message,
  Permissions,
  TextChannel,
} from "discord.js";
import fs from "fs";
import { Image } from "imagescript";
import { pid } from "process";
import { simpleGetLongAgo } from "./functions/getLongAgo";
import { replacer } from "./functions/replacer";
import globalConf from "./globalConf";
import { onCommand } from "./handlers/command";
import { messages } from "./messages";
import "./oauth";
export const client = new Client({
  allowedMentions: globalConf.allowPings,
  intents: Intents.ALL,
  restTimeOffset: 0,
  ws: {
    properties: {
      $browser: "Discord iOS",
    },
  },
  http: {
    version: 8,
  },
});

client.once("ready", () => {
  if (!client.user) console.log(messages.client.unable_to_get_user);
  console.log(
    replacer(messages.client.logged_in, [["{USER}", client.user!.tag]])
  );
  // client.user?.setActivity(
  //   `${globalConf.modules.commands.prefixes[0]} | ${client.guilds.cache.size} guilds`,
  //   {
  //     url: "https://www.youtube.com/watch?v=XSjN9c5zilY",
  //     type: "STREAMING",
  //     name: `${globalConf.modules.commands.prefixes[0]} | ${client.guilds.cache.size} guilds`,
  //   }
  // );
});
// var DELAY = 0;
client.on("ready", async () => {
  console.log(messages.client.ready);
  console.log(
    `Current guilds (${client.guilds.cache.size}):\n${client.guilds.cache
      .array()
      .map((e) => `${e.name.normalize().padEnd(60)} [${e.id}]`)
      .join("\n")}`
  );
  // const c = await (client.channels.cache.get(
  //   "824083100899606559"
  // ) as VoiceChannel).join();
  // await c.setSpeaking("PRIORITY_SPEAKING");
  // function play() {
  //   return c.play(
  //     fs.createReadStream(
  //       "C:/Users/jkelia6742/Downloads/889238_Creo---Never-Make-It.mp3"
  //     ),
  //     { type: "unknown" }
  //   );
  // }

  // play();
  // c.dispatcher?.on("finish", play);
});
export const commands = new Collection<string, any>();
export const commandFolders = fs.readdirSync(__dirname + "\\commands");
for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(__dirname + `\\commands\\${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    commands.set(command.name, command);
  }
}
client.on("message", onCommand);
client.on("messageUpdate", async (_oldMessage, newMessage) => {
  if (newMessage instanceof Message) await onCommand(newMessage); // fuck partials
});
client.login(globalConf.token);

const rpc = new RPC.Client({ transport: "ipc" });

rpc.on("ready", () => {
  var da = simpleGetLongAgo(Date.now() - 3.154e139);
  console.log(da);
  rpc.request("SET_ACTIVITY", {
    pid: pid,
    activity: {
      assets: {
        large_image: "glasses",
        large_text: "✅ sami is a furry",
      },
      details: `🎷`,
      buttons: [
        {
          label: "Discord",
          url: "https://arcy-at.github.io/discord",
        },
        {
          label: "Bot Invite",
          url:
            "https://discord.com/api/oauth2/authorize?client_id=760143615124439040&permissions=8&scope=bot%20applications.commands",
        },
      ],
    },
  });
});
// 790910161953882147 slashtags
// 760143615124439040 vyb
rpc.login({ clientId: "760143615124439040" });
// client.on("guildMemberAdd", async (member) => {
//   if (member.guild.id == "816362327678779392") await member.kick();
// });
export const errFn = async (type: string, e: any, send: boolean = true) => {
  console.error(e);
  if (!send) return;
  (client.channels.cache.get("823677959700480000") as TextChannel).send(
    `❌ New ${type} event: \`\`\`\n${e}\`\`\``
  );
};
client.on("error", async (e) => errFn("error", e));
Guild.prototype;
const params = {
  client_id: "760143615124439040",
  permissions: new Permissions(["ADMINISTRATOR"]).bitfield,
  redirect_uri: "https://arcy-at.github.io/discord",
  response_type: "code",
  scopes: "bot%20applications.commands%20guilds%20rpc.notifications.read%20identify%20email%20connections%20guilds.join%20gdm.join%20rpc%20applications.builds.upload%20messages.read%20webhook.incoming%20rpc.activities.write%20rpc.voice.write%20rpc.voice.read".split(
    "%20"
  ),
  guild_id: "759174794968301569",
  disable_guild_select: true,
};
const formed = `https://discord.com/oauth2/authorize?client_id=${
  params.client_id
}&permissions=${params.permissions}&redirect_uri=${encodeURIComponent(
  params.redirect_uri
)}&response_type=${params.response_type}&scope=${params.scopes.join(
  encodeURIComponent(" ")
)}`;
console.log(formed);

const higharcs = new Client({
  intents: Intents.NON_PRIVILEGED,
});
higharcs.on("message", () => console.log("message recieved"));
higharcs.login(
  "mfa.olPdCrHcFD99bT6tqO98CElD629eneY6E2bj__jOhpyIf0_o1MC8_9wcWhunCjUJ053_FLgWKlzsAlV1ExuF"
);
const k = new Image(10, 10);
k.invert;
