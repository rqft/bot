import { User } from "discord.js";
import { CustomEmojis } from "../enums/customEmojis";
import { Emojis } from "../enums/emojis";
import { UserStatusMap } from "../enums/userStatus";
import { Chars } from "../globals";

const spotifyIcon = "<:spotify:826151198603870239>";
export function getPresence(user: User, maxTextLength: number = 45) {
  const pres = user.presence;
  var stat = `${UserStatusMap.get(user.presence.status)?.icon} ${
    UserStatusMap.get(user.presence.status)?.text
  }`;
  var custom = null;
  const statuses = [];
  for (const item of pres.activities) {
    if (item.type == "CUSTOM_STATUS") {
      const e = item.emoji ?? CustomEmojis.GUI_RICH_PRESENCE;
      const text = item.state
        ? `${item.state.slice(0, maxTextLength)}${
            item.state.length > maxTextLength ? "..." : ""
          }`
        : "";
      custom = `${e} ${text} (${item.name})`;
    }
    if (item.type == "COMPETING") {
      const text = item.details ? `${item.details} - ` : "";
      const state = item.state ? `\n${Chars.TAB_SPACER} ${item.state}` : "";
      const name = item.name;
      statuses.push(`${Emojis.CROSSED_SWORDS} ${text}**${name}**${state}`);
    }
    if (item.type == "PLAYING") {
      const text = item.details ? `${item.details} - ` : "";
      const state = item.state ? `\n${Chars.TAB_SPACER} ${item.state}` : "";
      const name = item.name;
      statuses.push(`${Emojis.VIDEO_GAME} ${text}**${name}**${state}`);
    }
    if (item.type == "LISTENING") {
      const text = item.details ? `${item.details}` : "";
      const author = item.state ? ` by ${item.state}` : "";
      const track = text + author !== "" ? `${text}${author} - ` : "";
      const name = item.name;
      statuses.push(
        `${
          item.name == "Spotify" ? spotifyIcon : Emojis.MUSICAL_NOTE
        } ${track}**${name}**`
      );
    }
    if (item.type == "WATCHING") {
      const text = item.details ? `${item.details} - ` : "";
      const state = item.state ? `\n${Chars.TAB_SPACER} ${item.state}` : "";
      const name = item.name;
      statuses.push(`${Emojis.TV} ${text}**${name}**${state}`);
    }
    if (item.type == "STREAMING") {
      const text = item.details ? `${item.details} - ` : "";
      const state = item.state ? `\n${Chars.TAB_SPACER} ${item.state}` : "";
      const name = item.name;
      statuses.push(`${Emojis.SATELLITE} ${text}**${name}**${state}`);
    }
  }
  return `${stat}${custom ? `\n${custom}` : ""}${
    statuses.length !== 0 ? `\n${statuses.sort().join("\n")}` : ""
  }`;
}
