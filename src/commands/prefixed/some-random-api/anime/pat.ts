import { Command, CommandClient } from "detritus-client";
import { Animus, someRandomApiAnimu } from "../../../../functions/formatter";
import { BaseCommand, FunMetadata } from "../../basecommand";

export default class SRAPatCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "pat",
      metadata: FunMetadata("Sends an anime pat gif"),
    });
  }
  async run(context: Command.Context, _args: {}) {
    return someRandomApiAnimu(context, Animus.PAT);
  }
}
