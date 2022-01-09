import { CommandClient } from "detritus-client";
import { Context } from "detritus-client/lib/command/context";
import { BaseCommand } from "../basecommand";

export default class TestCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "test",
      async run(context: Context, _args: {}) {
        context.editOrReply("ok");
      },
    });
  }
}
