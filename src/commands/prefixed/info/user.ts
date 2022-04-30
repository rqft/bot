import { Command, CommandClient } from "detritus-client";
import { User } from "detritus-client/lib/structures";
import { infoUser } from "../../../functions/formatter";
import { Parameters } from "../../../functions/parameters";
import { editOrReply } from "../../../functions/tools";
import { BaseCommand, UtilityMetadata } from "../basecommand";
export interface UserArgs {
  user: User;
}
export default class UserCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "user",
      name: "user",
      priority: 4587,
      type: Parameters.user,
      default: Parameters.Default.user,
      required: true,
      metadata: UtilityMetadata("Get user info", "<user: User>", [
        "insyri",
        "insyri#7314",
        "533757461706964993",
      ]),
    });
  }
  async run(context: Command.Context, args: UserArgs) {
    const { user } = args;
    const embed = await infoUser(context, user);

    return await editOrReply(context, { embed });
  }
}
