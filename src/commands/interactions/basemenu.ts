import { Interaction, Structures } from "detritus-client";
import { ApplicationCommandTypes } from "detritus-client/lib/constants";
import { BaseInteraction } from "./baseinteraction";

export class BaseContextMenuMessageCommand extends BaseInteraction<{
  message: Structures.Message;
}> {
  error = "Message Context Menu";
  type = ApplicationCommandTypes.MESSAGE;

  global = true;
  permissionsIgnoreClientOwner = true;
  triggerLoadingAfter = 1000;
  triggerLoadingAsEphemeral = true;

  constructor(data: Interaction.InteractionCommandOptions = {}) {
    super(
      Object.assign(
        { guildIds: ["816362327678779392", "760130247580057650"] },
        data
      )
    );
  }
}
