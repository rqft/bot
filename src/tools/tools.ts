import { Context, EditOrReply } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import {
  InteractionEditOrRespond,
  Message,
} from "detritus-client/lib/structures";
import { PermissionsText } from "../constants";

export function editOrReply(
  context: Context,
  options: EditOrReply | string
): Promise<Message>;
export function editOrReply(
  context: InteractionContext,
  options: InteractionEditOrRespond | string
): Promise<null>;
export function editOrReply(
  context: Context | InteractionContext,
  options: EditOrReply | InteractionEditOrRespond | string
): Promise<Message | null>;
export function editOrReply(
  context: Context | InteractionContext,
  options: EditOrReply | InteractionEditOrRespond | string = {}
): Promise<Message | null> {
  if (typeof options === "string") {
    options = { content: options };
  }
  if (context instanceof InteractionContext) {
    return context.editOrRespond({
      ...options,
      allowedMentions: { parse: [], ...options.allowedMentions },
    }) as Promise<Message | null>;
  }
  return context.editOrReply({
    reference: true,
    ...options,
    allowedMentions: {
      parse: [],
      repliedUser: false,
      ...options.allowedMentions,
    },
  });
}

export function permissionsErrorList(failed: Array<bigint>) {
  const permissions: Array<string> = [];
  for (const permission of failed) {
    const key = String(permission);
    if (key in PermissionsText) {
      permissions.push(PermissionsText[key]!);
    } else {
      permissions.push(key);
    }
  }
  return permissions.map((v) => v.toLowerCase());
}
