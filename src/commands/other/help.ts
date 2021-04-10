import { MessageEmbed } from "discord.js";
import { client, commands } from "../..";
import { capitalizeWords } from "../../functions/capitalizeWords";
import { simpleGetLongAgo } from "../../functions/getLongAgo";
import { replacer } from "../../functions/replacer";
import globalConf from "../../globalConf";
import { Color } from "../../globals";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";

module.exports = {
  name: "help",
  // description: "List all of my commands or info about a specific command.",
  aliases: ["commands", "c", "?"],
  // usage: "[command: string]",
  async run(message, args) {
    const emb = new MessageEmbed();
    const data: string[] = [];
    const prefix = globalConf.modules.commands.prefixes[0];
    if (!args![0]) {
      data.push(
        "Invites: [Bot](https://arcy-at.github.io/bot) | [Support Server](https://arcy-at.github.io/discord) (you have to get the bot testers role to see the channel)"
      );
      data.push(
        `My prefixes are: ${globalConf.modules.commands.prefixes
          .map((e) => `\`${e}\``)
          .join(" ")}`
      );
      console.log(globalConf.modules.commands.prefixes);
      const cmds = commands.map((command: ICommand) => command.name);
      data.push(
        replacer(messages.commands.other.help.commands_list, [
          ["{COMMANDS}", cmds.map((e) => `\`${e}\``).join(" ")],
        ])
      );

      data.push(
        replacer(messages.commands.other.help.info_on_specific, [
          ["{PREFIX}", prefix],
        ])
      );
      emb.setDescription(data.join("\n"));
      emb.setColor(Color.hallucinate);
      emb.setAuthor(
        "Help Menu",
        client.user?.avatarURL() ?? client.user?.defaultAvatarURL
      );
      return reply(message, emb);
    }

    const name = args![0].toLowerCase();
    const command =
      (commands.get(name) as ICommand) ||
      (commands.find(
        (c: any) => c.aliases && c.aliases.includes(name)
      ) as ICommand);
    console.log(command);
    if (!command) {
      return reply(
        message,

        replacer(messages.commands.other.help.invalid_command, [
          ["{QUERY}", name],
        ])
      );
    }
    data.push(
      replacer(messages.commands.other.help.cmd.name, [
        ["{NAME}", command.name],
      ])
    );
    if (command.aliases)
      data.push(
        replacer(messages.commands.other.help.cmd.aliases, [
          ["{ALIASES}", command.aliases.map((e) => `\`${e}\``).join(" ")],
        ])
      );
    if (command.args)
      data.push(
        replacer(messages.commands.other.help.cmd.args, [
          [
            "{USAGE}",
            command.args
              .map((e) => {
                return `${e.required ? "<" : "("}${e.name}: ${e.type}${
                  e.required ? ">" : ")"
                }`;
              })
              .join(" "),
          ],
        ])
      );
    if (command.restrictions) {
      const res: string[] = [];
      res.push(
        replacer(messages.commands.other.help.cmd.restrictions.level, [
          ["{LEVEL}", command.restrictions.level ?? 0],
        ])
      );
      if (command.restrictions.botPermissions)
        res.push(
          replacer(
            messages.commands.other.help.cmd.restrictions.bot_permissions,
            [
              [
                "{PERMISSIONS}",
                command.restrictions.botPermissions
                  .map((e) => `\`${capitalizeWords(e)}\``)
                  .join(" "),
              ],
            ]
          )
        );
      if (command.restrictions.permissions)
        res.push(
          replacer(messages.commands.other.help.cmd.restrictions.permissions, [
            [
              "{PERMISSIONS}",
              command.restrictions.permissions
                .map((e) => `\`${capitalizeWords(e)}\``)
                .join(" "),
            ],
          ])
        );
      if (command.restrictions.ownerOnly)
        res.push(messages.commands.other.help.cmd.restrictions.dev);
      if (command.restrictions.serverOwnerOnly)
        res.push(messages.commands.other.help.cmd.restrictions.server_owner);
      emb.addField("Restrictions", res.join("\n"));
    }
    if (command.module)
      data.push(
        replacer(messages.commands.other.help.cmd.module, [
          ["{MODULE}", command.module],
        ])
      );
    if (command.confirmation && command.confirmation.enabled)
      data.push(
        replacer(messages.commands.other.help.cmd.confirm, [
          [
            "{TIMEOUT}",
            simpleGetLongAgo(
              Date.now() - (command.confirmation.timeout ?? 15000)
            ),
          ],
        ])
      );
    emb.setDescription(data);
    emb.setColor(Color.hallucinate);
    emb.setAuthor(
      "Help Menu",
      client.user?.avatarURL() ?? client.user?.defaultAvatarURL
    );
    reply(message, emb);
  },
} as ICommand;
