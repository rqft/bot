import { Command, CommandClient } from "detritus-client";
import { APIs } from "pariah";
import { someRandomApiAnimu } from "../../../../functions/formatter";
import { BaseCommand, FunMetadata } from "../../basecommand";
export default class SRAWinkCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "wink",
      metadata: FunMetadata("Sends an anime wink gif"),
    });
  }
  async run(context: Command.Context, _args: {}) {
    return someRandomApiAnimu(context, APIs.SomeRandomApi.Animes.WINK);
  }
}
