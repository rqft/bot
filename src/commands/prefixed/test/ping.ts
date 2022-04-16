import { Command, CommandClient } from "detritus-client";
import { ActivityTypes } from "detritus-client/lib/constants";
import { BaseCommand } from "../basecommand";
export default class TestCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "test",
    });
  }
  async run(context: Command.Context, _args: never) {
    context.message.convertContent();
    return await context.editOrReply({
      activity: { type: ActivityTypes.PLAYING, partyId: "1", sessionId: "1" },
    });
  }
}
