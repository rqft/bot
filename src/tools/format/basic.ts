import { Permissions } from "detritus-client/lib/constants";
import { Member } from "detritus-client/lib/structures";
import { IrrelevantPermissions, PermissionsText } from "../../constants";
import { CustomEmojis } from "../emojis";
import { Markdown } from "../markdown";

export module Basic {
  export function field(
    emoji: CustomEmojis | string,
    name: string | Markdown.Format,
    value: string | Markdown.Format
  ): string {
    return `${emoji} ${Markdown.Format.bold(name.toString())}: ${value}`;
  }
  export interface ImageArgs {
    target: string;
  }
  export interface TargetWithPermissions {
    can: Member["can"];
  }

  export function permissionsList(target: TargetWithPermissions) {
    const permissions: Array<bigint> = [];
    for (const key in Permissions) {
      const permission = Permissions[key as keyof typeof Permissions]!;
      if (IrrelevantPermissions.includes(permission)) {
        continue;
      }
      if (PermissionsText[String(permission)]) {
        if (target.can(permission)) {
          permissions.push(permission);
        }
      }
    }
    return permissions;
  }
}