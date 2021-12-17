import { Command, CommandClient } from "detritus-client";
import { Animals, someRandomApiAnimal } from "../../../functions/formatter";
import { BaseCommand } from "../../basecommand";

export default class SRAKoalaCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "koala",
    });
  }
  async run(context: Command.Context, _args: {}) {
    return someRandomApiAnimal(context, Animals.KOALA);
  }
}
