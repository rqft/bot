import { Member } from "detritus-client/lib/structures";
import { CustomEmojis } from "../emojis";
import { Markdown } from "../markdown";
export declare module Basic {
    function field(emoji: CustomEmojis | string, name: string | Markdown.Format, value: string | Markdown.Format): string;
    interface ImageArgs {
        target: string;
    }
    interface TargetWithPermissions {
        can: Member["can"];
    }
    function permissionsList(target: TargetWithPermissions): bigint[];
}
