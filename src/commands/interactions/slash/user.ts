import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { InteractionContext } from "detritus-client/lib/interaction";
import { User } from "detritus-client/lib/structures";
import { infoUser } from "../../../functions/formatter";
import { BaseSlashCommand } from "../baseinteraction";
export interface UserArgs {
  user: User;
}
export default class UserCommand extends BaseSlashCommand {
  name = "user";
  description = "User Info";
  constructor() {
    super({
      options: [
        {
          name: "user",
          description: "User",
          type: ApplicationCommandOptionTypes.USER,
          required: true,
        },
      ],
    });
  }

  async run(context: InteractionContext, args: UserArgs) {
    const embed = await infoUser(context, args.user);

    return await context.editOrRespond({
      embeds: [embed],
      content: "\u200b",
    });
  }
}
