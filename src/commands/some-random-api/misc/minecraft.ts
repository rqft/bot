import { CommandClient } from "detritus-client";
import { Context } from "detritus-client/lib/command";
import { SomeRandomAPI } from "pariah";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { BaseCommand } from "../../basecommand";

export interface SRAMinecraftArgs {
  username: string;
}
export default class SRAMinecraftCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "mc",

      label: "username",
      type: "string",
      required: true,
    });
  }
  async run(context: Context, args: SRAMinecraftArgs) {
    const { username, uuid, name_history } =
      await new SomeRandomAPI().minecraft(args.username);

    const embed = createBrandEmbed(Brand.SOME_RANDOM_API, context);
    embed.setTitle("Minecraft Info");
    {
      const description: Array<string> = [];
      description.push(`**Name**: ${username}`);
      description.push(`**UUID**: ${uuid}`);
      embed.setDescription(description.join("\n"));
    }
    {
      const nameHistory: Array<string> = [];
      name_history.forEach((value) => {
        nameHistory.push(`\`${value.changedToAt}\` ${value.name}`);
      });
      embed.addField("Name History", nameHistory.join("\n"));
    }
    embed.setThumbnail(minotar(uuid, 1024, MinotarForm.ISOMETRIC_HEAD));
    {
      const value: Array<string> = [];
      for (const k in MinotarForm) {
        value.push(
          `[${MinotarStrings[k as MinotarForm]}](${minotar(
            uuid,
            1024,
            k as MinotarForm
          )})`
        );
      }
      embed.addField("Image URLs", value.join(" | "));
    }
    return context.editOrReply({ embed });
  }
}
enum MinotarForm {
  AVATAR = "avatar",
  AVATAR_HELM = "helm",
  ISOMETRIC_HEAD = "cube",
  BODY = "body",
  ARMOR_BODY = "armor/body",
  BUST = "bust",
  SKIN = "skin",
}

const MinotarStrings: Record<MinotarForm, string> = {
  [MinotarForm.AVATAR]: "Avatar",
  [MinotarForm.AVATAR_HELM]: "Avatar (With Helmet)",
  [MinotarForm.ISOMETRIC_HEAD]: "Isometric Head",
  [MinotarForm.BODY]: "Body",
  [MinotarForm.ARMOR_BODY]: "Body (With Armor)",
  [MinotarForm.BUST]: "Bust",
  [MinotarForm.SKIN]: "Skin File",
};
function minotar(
  user: string,
  size = 256,
  form: MinotarForm = MinotarForm.AVATAR
) {
  return `https://minotar.net/${form}/${user}/${size}.png`;
}
