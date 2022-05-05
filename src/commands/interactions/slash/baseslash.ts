import { ApplicationCommandTypes } from "detritus-client/lib/constants";
import { ParsedArgs } from "detritus-client/lib/interaction";
import { BaseInteraction } from "../baseinteraction";

export class BaseSlashCommand<T = ParsedArgs> extends BaseInteraction<T> {
  error = "Slash";
  permissionsIgnoreClientOwner = true;
  type = ApplicationCommandTypes.CHAT_INPUT;

  triggerLoadingAfter = 1000;
}
