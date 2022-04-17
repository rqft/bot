import { Command, CommandClient } from "detritus-client";
import { User } from "detritus-client/lib/structures/user";
import {
  Canvas,
  someRandomApiCanvasMisc,
} from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, ImageArgs } from "../../basecommand";

export interface SRALoliceArgs {
  user: User;
}

export default class SRALoliceCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "lolice",
      aliases: ["lolipolice", "loli-police"],

      label: "image",
      type: Parameters.image(),
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiCanvasMisc(
      context,
      args.image,
      Canvas.LOLI_POLICE,
      {}
    );
    return await editOrReply(context, { embed });
  }
}
