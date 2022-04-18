import { Command, CommandClient } from "detritus-client";
import { Animals, someRandomApiAnimal } from "../../../../functions/formatter";
import { BaseCommand, FunMetadata } from "../../basecommand";

export default class SRACatCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "cat",
      metadata: FunMetadata("Sends a cat image"),
    });
  }
  async run(context: Command.Context, _args: {}) {
    return someRandomApiAnimal(context, Animals.CAT);
  }
}
