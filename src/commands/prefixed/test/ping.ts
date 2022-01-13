import { Command, CommandClient } from "detritus-client";
import { Parameters } from "../../../functions/parameters";
import { messages } from "../../../messages";
import { BaseCommand, ImageArgs } from "../basecommand";
export default class TestCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "test",

      label: "image",
      type: Parameters.image,
      onBefore: (context) => context.user.isClientOwner,
      onCancel: (context) =>
        context.editOrReply(messages.permissions.missing_dev),
    });
  }
  async run(_context: Command.Context, _args: ImageArgs) {}
}
// rooot is a
