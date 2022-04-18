import { Command, CommandClient } from "detritus-client";
import { Animals, someRandomApiAnimal } from "../../../../functions/formatter";
import { BaseCommand, FunMetadata } from "../../basecommand";

export default class SRADogCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "dog",
      metadata: FunMetadata("Sends a dog image"),
    });
  }
  async run(context: Command.Context, _args: {}) {
    return someRandomApiAnimal(context, Animals.DOG);
  }
}
