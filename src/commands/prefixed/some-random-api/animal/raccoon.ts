import { Command, CommandClient } from "detritus-client";
import { Animals, someRandomApiAnimal } from "../../../../functions/formatter";
import { BaseCommand, FunMetadata } from "../../basecommand";

export default class SRARaccoonCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "raccoon",
      metadata: FunMetadata("Sends a raccoon image"),
    });
  }
  async run(context: Command.Context, _args: {}) {
    return someRandomApiAnimal(context, Animals.RACCOON);
  }
}
