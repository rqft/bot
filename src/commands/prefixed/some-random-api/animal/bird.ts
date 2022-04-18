import { Command, CommandClient } from "detritus-client";
import { Animals, someRandomApiAnimal } from "../../../../functions/formatter";
import { BaseCommand, FunMetadata } from "../../basecommand";

export default class SRABirdCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "bird",
      metadata: FunMetadata("Sends a bird image"),
    });
  }
  async run(context: Command.Context, _args: {}) {
    return someRandomApiAnimal(context, Animals.BIRD);
  }
}
