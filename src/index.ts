import { Client, Collection, Intents } from "discord.js";
import fs from "fs";
import { getConfig } from "./functions/getConfig";
import { replacer } from "./functions/replacer";
import { uploadConfig } from "./functions/uploadConfig";
import { globalConf } from "./globalConf";
import { onCommand } from "./handlers/command";
import { messages } from "./messages";
export const client = new Client({
  allowedMentions: {
    users: [],
    repliedUser: false,
  },
  intents: Intents.ALL,
});
client.once("ready", () => {
  if (!client.user) console.log(messages.client.unable_to_get_user);
  console.log(
    replacer(messages.client.logged_in, new Map([["{USER}", client.user!.tag]]))
  );
});
client.on("ready", () => console.log(messages.client.ready));
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
client.on("message", async (message) => {
  switch (message.content) {
    case "%config%": {
      const conf = getConfig(message.guild!.id);
      const map = new Map([["{USER}", message.author.toString()]]);
      const res = await message.reply(
        replacer(messages.config.get_config, map),
        {
          files: [
            {
              name: "config.json",
              attachment: JSON.stringify(conf, null, 2),
            },
          ],
        }
      );
      setTimeout(() => {
        try {
          res.delete();
        } catch {
          message.reply(replacer(messages.config.cant_delete_message, map));
        }
      }, 15000);
      break;
    }
    case "%config_set%": {
      const map = new Map([["{USER}", message.author.toString()]]);
      if (
        !message.attachments ||
        !message.attachments.find((e) => e.name == "config.json")
      )
        return await message.reply(
          replacer(messages.config.cant_download_file, map)
        );
      const conf = message.attachments.find((e) => e.name == "config.json");
      if (JSON.parse(conf!.attachment.toString()).guildId !== message.guild!.id)
        return await message.reply(
          replacer(messages.config.incorrect_guild_id, map)
        );
      try {
        uploadConfig(
          message.guild!.id,
          JSON.parse(conf!.attachment.toString())
        );
      } catch (e) {
        map.set("{ERROR}", e);
        return await message.reply(
          replacer(messages.config.error_while_updating, map)
        );
      }
      try {
        await message.delete();
      } catch {
        return await message.reply(
          replacer(messages.config.cant_delete_message, map)
        );
      }
      await message.reply(replacer(messages.config.updated_config, map));
      break;
    }
  }
});
client.login(globalConf.token);
