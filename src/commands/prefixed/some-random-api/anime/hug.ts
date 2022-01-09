import { Command, CommandClient } from "detritus-client";
import { Animus, someRandomApiAnimu } from "../../../../functions/formatter";
import { BaseCommand } from "../../basecommand";

export default class SRAHugCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "hug",
    });
  }
  async run(context: Command.Context, _args: {}) {
    return someRandomApiAnimu(context, Animus.HUG);
  }
}
