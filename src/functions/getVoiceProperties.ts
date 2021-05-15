import { VoiceState } from "detritus-client/lib/structures";
import { CustomEmojis } from "../enums/customEmojis";
import { IElement } from "../interfaces/IElement";

export function getVoiceProperties(voiceState: VoiceState): IElement[] {
  const properties: IElement[] = [];
  if (voiceState.deaf)
    properties.push({
      text: "Server Deafened",
      icon: CustomEmojis.GUI_DEAFENED,
    });
  if (voiceState.mute)
    properties.push({
      text: "Server Muted",
      icon: CustomEmojis.GUI_MUTED,
    });
  if (voiceState.selfDeaf)
    properties.push({
      text: "Deafened",
      icon: CustomEmojis.GUI_DEAFENED,
    });
  if (voiceState.selfMute)
    properties.push({
      text: "Muted",
      icon: CustomEmojis.GUI_MUTED,
    });
  if (voiceState.selfStream)
    properties.push({
      text: "Streaming",
      icon: CustomEmojis.GUI_STREAM,
    });
  if (voiceState.selfVideo)
    properties.push({
      text: "On Video",
      icon: CustomEmojis.GUI_VIDEO,
    });
  if (voiceState.suppress)
    properties.push({
      text: "Suppressed",
      icon: CustomEmojis.GUI_MUTED,
    });
  return properties;
}
