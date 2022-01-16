import { Command, CommandClient } from "detritus-client";
import { PxlApi } from "pariah";
import { FlagType } from "pariah/dist";
import { Brand } from "../../../enums/brands";
import { createImageEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { storeImage } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ImageArgs } from "../basecommand";

export const flagChoices: Array<FlagType> = [
  "asexual",
  "aromantic",
  "bisexual",
  "pansexual",
  "gay",
  "lesbian",
  "trans",
  "nonbinary",
  "genderfluid",
  "genderqueer",
  "polysexual",
  "austria",
  "belgium",
  "botswana",
  "bulgaria",
  "ivory",
  "estonia",
  "france",
  "gabon",
  "gambia",
  "germany",
  "guinea",
  "hungary",
  "indonesia",
  "ireland",
  "italy",
  "luxembourg",
  "monaco",
  "nigeria",
  "poland",
  "russia",
  "romania",
  "sierraleone",
  "thailand",
  "ukraine",
  "yemen",
];
export interface PxlFlagArgs extends ImageArgs {
  flag: FlagType;
  opacity: number;
}
export default class PxlFlagCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "flag",
      type: [
        {
          name: "image",
          type: Parameters.image,
        },
      ],
      args: [
        {
          name: "flag",
          type: "string",
          choices: flagChoices,
          default: "default",
        },
        {
          name: "opacity",
          type: "number",
          default: 128,
          choices: [...Array(192 - 64 + 1).keys()].map((v) => v + 64),
        },
      ],
    });
  }
  async run(context: Command.Context, args: PxlFlagArgs) {
    const pxl = new PxlApi(Secrets.Key.pxlAPI);
    const imageAttach = await storeImage(args.image, "attachment.gif");
    const flag = await pxl.flag([imageAttach.url!], args.flag, args.opacity);
    const embed = await createImageEmbed(
      context,
      flag,
      undefined,
      Brand.PXL_API
    );

    return await context.editOrReply({ embed });
  }
}
