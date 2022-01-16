import { Command, CommandClient } from "detritus-client";
import { EditOrReply } from "detritus-client/lib/command";
import { Paginator, reactions } from "../../../globals";
import { BaseCommand, ImageArgs } from "../basecommand";
export default class TestCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "test",
    });
  }
  async run(context: Command.Context, _args: ImageArgs) {
    let pages: Array<EditOrReply> = [
      { content: "first" },
      { content: "second" },
      { content: "third" },
      { content: "last" },
    ];
    await Paginator.createReactionPaginator({
      message: context,
      reactions: reactions,
      pages,
    });
  }
}
