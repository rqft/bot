import { Command, CommandClient } from "detritus-client";
import { Animals, someRandomApiAnimal } from "../../../../functions/formatter";
import { BaseCommand } from "../../basecommand";

export default class SRAPandaCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "panda",
    });
  }
  async run(context: Command.Context, _args: {}) {
    return someRandomApiAnimal(context, Animals.PANDA);
  }
}
