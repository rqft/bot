import { Command, CommandClient } from "detritus-client";
import { User } from "detritus-client/lib/structures";
import { infoUser } from "../../../functions/formatter";
import { DefaultParameters, Parameters } from "../../../functions/parameters";
import { editOrReply } from "../../../functions/tools";
import { BaseCommand } from "../basecommand";
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
      default: DefaultParameters.user,
      required: true,
    });
  }
  async run(context: Command.Context, args: UserArgs) {
    const { user } = args;
    const embed = await infoUser(context, user);

    return await editOrReply(context, { embed });
  }
}
