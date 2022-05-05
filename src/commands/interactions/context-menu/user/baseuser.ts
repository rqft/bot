import { ApplicationCommandTypes } from "detritus-client/lib/constants";
import { Member, User } from "detritus-client/lib/structures";
import { BaseInteraction } from "../../baseinteraction";

export interface ContextMenuUserArgs {
  member?: Member;
  user: User;
}

export class BaseContextMenuUserCommand extends BaseInteraction<ContextMenuUserArgs> {
  error = "User Context Menu";
  type = ApplicationCommandTypes.USER;

  permissionsIgnoreClientOwner = true;
  triggerLoadingAfter = 1000;
  triggerLoadingAsEphemeral = true;
}
