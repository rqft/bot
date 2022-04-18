import { Command, CommandClient } from "detritus-client";
import { ActivityTypes } from "detritus-client/lib/constants";
import { editOrReply } from "../../../functions/tools";
import { BaseCommand } from "../basecommand";
export default class TestCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "test",
      metadata: {
        usage: "",
        description: "runs a test",
        examples: [],
      },
    });
  }
  async run(context: Command.Context, _args: never) {
    context.message.convertContent();
    return await editOrReply(context, {
      activity: { type: ActivityTypes.PLAYING, partyId: "1", sessionId: "1" },
    });
  }
}
