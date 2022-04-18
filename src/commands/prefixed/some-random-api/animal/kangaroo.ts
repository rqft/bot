import { Command, CommandClient } from "detritus-client";
import { Animals, someRandomApiAnimal } from "../../../../functions/formatter";
import { BaseCommand, FunMetadata } from "../../basecommand";

export default class SRAKangarooCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "kangaroo",
      metadata: FunMetadata("Sends a kangaroo image"),
    });
  }
  async run(context: Command.Context, _args: {}) {
    return someRandomApiAnimal(context, Animals.KANGAROO);
  }
}
