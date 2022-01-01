import { Command, CommandClient } from "detritus-client";
import { PxlApi } from "pariah";
import { EyesType } from "pariah/dist";
import { createImageEmbed } from "../../functions/embed";
import { Parameters } from "../../functions/parameters";
import { storeImage } from "../../functions/tools";
import { Secrets } from "../../secrets";
import { BaseCommand, ImageArgs } from "../basecommand";

export const eyesChoices: Array<EyesType> = [
  "big",
  "black",
  "bloodshot",
  "blue",
  "default",
  "googly",
  "green",
  "horror",
  "illuminati",
  "money",
  "pink",
  "red",
  "small",
  "spinner",
  "spongebob",
  "white",
  "yellow",
  "random",
];
export interface PxlEyesArgs extends ImageArgs {
  type: EyesType;
}
export default class PxlEyesCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "eyes",
      type: [
        {
          name: "type",
          type: "string",
          choices: eyesChoices,
          default: "default",
        },
        {
          name: "image",
          type: Parameters.image,
        },
      ],
    });
  }
  async run(context: Command.Context, args: PxlEyesArgs) {
    const pxl = new PxlApi(Secrets.Key.pxlAPI);
    const imageAttach = await storeImage(args.image, "attachment.gif");
    const eyes = await pxl.eyes([imageAttach.url!], args.type);
    const embed = await createImageEmbed(context, eyes);

    return await context.editOrReply({ embed });
  }
}
