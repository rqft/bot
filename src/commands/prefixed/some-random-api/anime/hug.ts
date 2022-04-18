import { Command, CommandClient } from "detritus-client";
import { Animus, someRandomApiAnimu } from "../../../../functions/formatter";
import { BaseCommand, FunMetadata } from "../../basecommand";

export default class SRAHugCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "hug",
      metadata: FunMetadata("Sends an anime hug gif"),
    });
  }
  async run(context: Command.Context, _args: {}) {
    return someRandomApiAnimu(context, Animus.HUG);
  }
}
