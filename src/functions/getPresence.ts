import { User } from "discord.js";
import { CustomEmojis } from "../maps/customEmojis";
import { decor } from "../maps/emojiEnum";
import { UserStatusMap } from "../maps/userStatus";
const spotifyIcon = "<:spotify:794402275472179240>";
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
      const name = item.name;
      statuses.push(`${decor.Emojis.CROSSED_SWORDS} ${text}**${name}**`);
    }
    if (item.type == "PLAYING") {
      const text = item.details ? `${item.details} - ` : "";
      const state = item.state ? `\n┗— ${item.state}` : "";
      const name = item.name;
      statuses.push(`${decor.Emojis.VIDEO_GAME} ${text}**${name}**${state}`);
    }
    if (item.type == "LISTENING") {
      const text = item.details ? `${item.details}` : "";
      const author = item.state ? ` by ${item.state}` : "";
      const track = text + author !== "" ? `${text}${author} - ` : "";
      const name = item.name;
      statuses.push(
        `${
          item.name == "Spotify" ? spotifyIcon : decor.Emojis.MUSICAL_NOTE
        } ${track}**${name}**`
      );
    }
    if (item.type == "WATCHING") {
      const text = item.details ? `${item.details} - ` : "";
      const state = item.state ? `\n┗— ${item.state}` : "";
      const name = item.name;
      statuses.push(`${decor.Emojis.TV} ${text}**${name}**${state}`);
    }
    if (item.type == "STREAMING") {
      const text = item.details ? `${item.details} - ` : "";
      const state = item.state ? `\n┗— ${item.state}` : "";
      const name = item.name;
      statuses.push(`${decor.Emojis.SATELLITE} ${text}**${name}**${state}`);
    }
  }
  return `${stat}${custom ? `\n${custom}` : ""}${
    statuses.length !== 0 ? `\n${statuses.sort().join("\n")}` : ""
  }`;
}
