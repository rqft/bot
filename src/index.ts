import chalk from "chalk";
import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
} from "detritus-client/lib/constants";
import {
  capitalizeWords,
  getVyboseGuildFlags,
  replacer,
  simpleGetLongAgo,
} from "./functions/tools";
import { config } from "./globalConf";
import {
  altclients,
  client,
  commands,
  interactions,
  selfclient,
} from "./globals";

commands.addMultipleIn("/commands/prefixed", { subdirectories: true });
commands.on("commandDelete", ({ reply }) => reply.delete());

interactions.addMultipleIn("/commands/interactions", { subdirectories: true });
interactions.checkAndUploadCommands();

enum Tones {
  SERIOUS = "/srs",
  SARCASTIC = "/s",
  JOKING = "/j",
  HALF_JOKING = "/hj",
  PLATONIC = "/p",
  ROMANTIC = "/r",
  LYRICS = "/ly",
  TEASING = "/t",
  NOT_MAD = "/nm",
  NEGATIVE_CONNOTATION = "/nc",
  POSITIVE_CONNOTATION = "/pc",
  LIGHT_HEARTED = "/lh",
  NOBODY_HERE = "/nbh",
  METAPHORICALLY = "/m",
  LITERALLY = "/li",
  RHETORICAL = "/rt",
  GENUINE_QUESTION = "/gen",
  HYPERBOLE = "/hyp",
  COPY_PASTA = "/c",
  SEXUAL_INTENT = "/x",
  NON_SEXUAL_INTENT = "/nx",
  THREAT = "/th",
  CLICKBAIT = "/cb",
  FAKE = "/f",
  GENIUNE = "/g",
}
interface TonyArgs {
  content: string;
  tone1: Tones;
  tone2?: Tones;
  tone3?: Tones;
  tone4?: Tones;
  tone5?: Tones;
  tone6?: Tones;
  tone7?: Tones;
  tone8?: Tones;
  tone9?: Tones;
  tone10?: Tones;
}

interactions.add(
  {
    name: "tony",
    description: "Add tones",
    options: [
      {
        name: "content",
        type: ApplicationCommandOptionTypes.STRING,
        required: true,
        description: "What you want to say",
      },
      ...[...Array(10).keys()].map((v, i) => ({
        name: `tone${v + 1}`,
        type: ApplicationCommandOptionTypes.STRING,
        choices: Object.entries(Tones).map(([k, v]) => ({
          name: capitalizeWords(k.toLowerCase()),
          value: v,
        })),
        required: i === 0,
        description: "What tone to use",
      })),
    ],
    type: ApplicationCommandTypes.CHAT_INPUT,
    guildIds: ["816362327678779392"],
  },
  async (context, args) => {
    const {
      content,
      tone1,
      tone2,
      tone3,
      tone4,
      tone5,
      tone6,
      tone7,
      tone8,
      tone9,
      tone10,
    } = args as TonyArgs;
    const tones = [
      tone1,
      tone2,
      tone3,
      tone4,
      tone5,
      tone6,
      tone7,
      tone8,
      tone9,
      tone10,
    ].filter((v) => v);
    const tone = tones.length > 0 ? tones.join(" ") : "";
    const tony = `${content} ${tone}`;
    const reply = context.editOrRespond(tony);

    return reply;
  }
);

(async function run() {
  const start = Date.now();
  await commands.run();

  await interactions.run();
  const all = [client, selfclient, ...altclients];

  await Promise.all(
    all.map(async (value) => {
      value;
      const s = Date.now();
      await value.run();

      console.log(
        replacer(
          `✅ Took ${chalk.yellow(`{TIME}`)} to deploy ${chalk.red(
            "{USER}"
          )} (uploading ${chalk.green("{GUILDS} guilds")} and ${chalk.blue(
            "{MEMBERS} members"
          )}) with a ${chalk.redBright("shard count of {SHARDS}")}`,
          [
            ["{TIME}", simpleGetLongAgo(s)],
            ["{USER}", value.user?.toString()],
            ["{GUILDS}", value.guilds.size],
            ["{MEMBERS}", value.users.size],
            ["{SHARDS}", value.shardCount],
          ],
          config.locale
        )
      );
    })
  );
  console.log(`ok done in ${simpleGetLongAgo(start)}`);
  console.log(
    "\nloaded commands:\n" +
      commands.commands
        .map((v) => v.name)
        .sort()
        .join(", ")
  );
  console.log(
    "\nloaded interactions:\n" +
      interactions.commands
        .map(
          (v) =>
            `${
              [
                "Unknown",
                "Slash",
                "Context Menu (User)",
                "Context Menu (Message)",
              ][v.type]
            } > ${v.name}`
        )
        .join("\n")
  );
  console.log(
    `\ndeployed to ${client.guilds.size} guilds\n` +
      client.guilds
        .map((v) => `${getVyboseGuildFlags(v).join(" ")} ${v.name} (${v.id})`)
        .join("\n")
  );
})();
