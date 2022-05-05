import { ApplicationCommandTypes } from "detritus-client/lib/constants";
import { Message } from "detritus-client/lib/structures";
import { BaseInteraction } from "../../baseinteraction";

export interface ContextMenuMessageArgs {
  message: Message;
}

export class BaseContextMenuMessageCommand extends BaseInteraction<ContextMenuMessageArgs> {
  error = "Message Context Menu";
  type = ApplicationCommandTypes.MESSAGE;

  permissionsIgnoreClientOwner = true;
  triggerLoadingAfter = 1000;
  triggerLoadingAsEphemeral = true;
}
