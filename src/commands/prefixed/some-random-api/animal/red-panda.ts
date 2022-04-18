import { Command, CommandClient } from "detritus-client";
import { Animals, someRandomApiAnimal } from "../../../../functions/formatter";
import { BaseCommand, FunMetadata } from "../../basecommand";

export default class SRARedPandaCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "redpanda",
      metadata: FunMetadata("Sends a red panda image"),
    });
  }
  async run(context: Command.Context, _args: {}) {
    return someRandomApiAnimal(context, Animals.RED_PANDA);
  }
}
