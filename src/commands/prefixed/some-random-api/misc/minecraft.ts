import { CommandClient } from "detritus-client";
import { Context } from "detritus-client/lib/command";
import { SomeRandomApi } from "pariah/dist/lib";
import { Brand } from "../../../../enums/brands";
import { createBrandEmbed } from "../../../../functions/embed";
import { Err } from "../../../../functions/error";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, FunMetadata } from "../../basecommand";

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
      metadata: FunMetadata(
        "Get information about a Minecraft user",
        "<username: string>",
        ["HighArcs", "trueharu__"]
      ),
    });
  }
  async run(context: Context, args: SRAMinecraftArgs) {
    const result = await new SomeRandomApi.API().minecraft(args.username);
    if ("error" in result) {
      throw new Err(result.error);
    }
    const { username, uuid, name_history } = result;

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
          // @ts-ignore
          `[${MinotarStrings[MinotarForm[k]]}](${minotar(
            uuid,
            1024,
            // @ts-ignore
            MinotarForm[k]
          )})`
        );
      }
      embed.addField("Image URLs", value.join(" | "));
    }
    return editOrReply(context, { embed });
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
