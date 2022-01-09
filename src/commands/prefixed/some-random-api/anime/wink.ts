import { Command, CommandClient } from "detritus-client";
import { Animus, someRandomApiAnimu } from "../../../../functions/formatter";
import { BaseCommand } from "../../basecommand";

export default class SRAWinkCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "wink",
    });
  }
  async run(context: Command.Context, _args: {}) {
    return someRandomApiAnimu(context, Animus.WINK);
  }
}
