import { PresenceActivity, User } from "detritus-client/lib/structures";
import { CustomEmojis } from "../enums/customEmojis";
import { Emojis } from "../enums/emojis";
import { UserStatusMap } from "../enums/userStatus";
import { PresenceStatus, PresenceStatusUnion } from "../enums/utils";
import { Chars } from "../globals";
import { formatTimestamp } from "./formatTimestamp";
import { simpleGetLongAgo } from "./getLongAgo";
const spotifyIcon = "<:spotify:826151198603870239>";

export function getPresence(user: User, maxTextLength: number = 45) {
  const genTime = (item: PresenceActivity) =>
    `\n${Chars.TAB_SPACER_END} for ${simpleGetLongAgo(
      item.createdAt ?? Date.now()
    )} ${formatTimestamp(item.createdAt ?? Date.now())}`;
  const pres = user.presence!;
  var stat = `${UserStatusMap.get(pres.status as PresenceStatusUnion)?.icon} ${
    UserStatusMap.get(pres.status as PresenceStatusUnion)?.text
  }`;
  var custom = null;
  const statuses = [];
  for (const i of pres.activities) {
    const item = i[1];
    if (item.type === PresenceStatus.CUSTOM_STATUS) {
      const e = item.emoji ?? CustomEmojis.GUI_RICH_PRESENCE;
      const text = item.state
        ? `${item.state.slice(0, maxTextLength)}${
            item.state.length > maxTextLength ? "..." : ""
          }`
        : "";
      custom = `${e} ${text} (${item.name})${genTime(item)}`;
    }
    if (item.type == PresenceStatus.PLAYING) {
      const text = item.details ? `${item.details} - ` : "";
      const state = item.state ? `\n${Chars.TAB_SPACER} ${item.state}` : "";
      const name = item.name;
      statuses.push(
        `${
          item.isOnXbox ? CustomEmojis.CONNECTION_XBOX : Emojis.VIDEO_GAME
        } ${text}**${name}**${state}${genTime(item)}`
      );
    }
    if (item.type == PresenceStatus.LISTENING) {
      const text = item.details ? `${item.details}` : "";
      const author = item.state ? ` by ${item.state}` : "";
      const track = text + author !== "" ? `${text}${author} - ` : "";
      const name = item.name;
      statuses.push(
        `${
          item.isOnSpotify ? spotifyIcon : Emojis.MUSICAL_NOTE
        } ${track}**${name}**${genTime(item)}`
      );
    }
    if (item.type == PresenceStatus.WATCHING) {
      const text = item.details ? `${item.details} - ` : "";
      const state = item.state ? `\n${Chars.TAB_SPACER} ${item.state}` : "";
      const name = item.name;
      statuses.push(`${Emojis.TV} ${text}**${name}**${state}${genTime(item)}`);
    }
    if (item.type == PresenceStatus.STREAMING) {
      const text = item.details ? `${item.details} - ` : "";
      const state = item.state ? `\n${Chars.TAB_SPACER} ${item.state}` : "";
      const name = item.name;
      statuses.push(
        `${Emojis.SATELLITE} ${text}**${name}**${state}${genTime(item)}`
      );
    }
  }
  return `${stat}${custom ? `\n${custom}` : ""}${
    statuses.length !== 0 ? `\n${statuses.sort().join("\n")}` : ""
  }`;
}
