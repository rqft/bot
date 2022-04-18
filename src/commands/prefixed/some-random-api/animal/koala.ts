import { Command, CommandClient } from "detritus-client";
import { Animals, someRandomApiAnimal } from "../../../../functions/formatter";
import { BaseCommand, FunMetadata } from "../../basecommand";

export default class SRAKoalaCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "koala",
      metadata: FunMetadata("Sends a koala image"),
    });
  }
  async run(context: Command.Context, _args: {}) {
    return someRandomApiAnimal(context, Animals.KOALA);
  }
}
