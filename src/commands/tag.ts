import { MessageEmbed } from "discord.js";
import { Tags } from "..";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";
import { decor } from "../maps/emojiEnum";
module.exports = {
  name: "tag",
  cooldown: 3,
  description: "put key value pairs lol",
  usesArgs: true,
  usage: "<function: TagFunc> <name: string> [value: Text]",
  async run(message, args) {
    const func = args[0];
    const value = args.slice(2).join(" ");
    if (!func)
      return await message.reply(
        `${decor.Emojis.NO_ENTRY} you need to supply a function`
      );
    switch (func) {
      case "set":
        if (!args[1])
          return await message.reply(
            `${decor.Emojis.NO_ENTRY} you need to supply a tag name!`
          );
        const createname = args[1].normalize();

        if (!value)
          return await message.reply(
            `${decor.Emojis.NO_ENTRY} you need to supply a tag value!`
          );
        const old = await Tags.findOne({ where: { name: createname } });
        try {
          await Tags.create({
            name: createname,
            description: value,
            username: message.author.tag,
          });
          return await message.reply(
            `${decor.Emojis.WHITE_CHECK_MARK} Tag ${createname} was edited.`,
            new MessageEmbed({
              fields: [
                {
                  name: "Old Value",
                  value: old ? old.get("description") : "<unset>",
                },
                {
                  name: "new value",
                  value: value,
                },
              ],
            })
          );
        } catch (e) {
          if (e.name === "SequelizeUniqueConstraintError") {
            const affectedRows = await Tags.update(
              { description: value },
              { where: { name: createname } }
            );
            if (!(affectedRows.length > 0)) {
              return await message.reply(
                `${decor.Emojis.NO_ENTRY} unable to find that tag`
              );
            }
            return await message.reply(
              `${decor.Emojis.WHITE_CHECK_MARK} Tag ${createname} was edited.`,
              new MessageEmbed({
                fields: [
                  {
                    name: "Old Value",
                    value: old ? old.get("description") : "<unset>",
                  },
                  {
                    name: "new value",
                    value: value,
                  },
                ],
              })
            );
          }
          return message.reply(
            `${decor.Emojis.NO_ENTRY} something went wrong with adding a tag`
          );
        }
      case "list":
        const tagList = await Tags.findAll({ attributes: ["name"] });
        const tagString =
          tagList.map((t) => t.get("name") as string).join(", ") ??
          "No tags set.";
        return message.channel.send(
          new MessageEmbed({
            title: "list of tags",
            description: tagString,
            color: Color.embed,
          })
        );
      default:
        if (!args[0])
          return await message.reply(
            `${decor.Emojis.NO_ENTRY} you need to supply a tag name!`
          );
        let getname = args[0].normalize();
        const tag = await Tags.findOne({ where: { name: getname } });
        if (!tag)
          return await message.reply(
            `${decor.Emojis.NO_ENTRY} could not find tag: ${getname}`
          );
        tag.increment("usage_count");
        const emb = new MessageEmbed();
        emb.setTitle(`tag "${tag.get("name")}"`);
        emb.setDescription(tag.get("description"));
        emb.setFooter(`${decor.Emojis.PENCIL} set by ${tag.get("username")}`);
        emb.setColor(Color.embed);
        return message.reply(emb);
    }
  },
} as ICommand;
