import { User } from "discord.js";
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
      const e = item.emoji
        ? item.emoji
        : "<:IconGui_RichPresence:798624241351655514>";
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
      statuses.push(`:crossed_swords: ${text}**${name}**`);
    }
    if (item.type == "PLAYING") {
      const text = item.details ? `${item.details} - ` : "";
      const name = item.name;
      statuses.push(`:video_game: ${text}**${name}**`);
    }
    if (item.type == "LISTENING") {
      const text = item.details ? `${item.details}` : "";
      const author = item.state ? ` by ${item.state}` : "";
      const track = text + author !== "" ? `${text}${author} - ` : "";
      const name = item.name;
      statuses.push(
        `${
          item.name == "Spotify" ? spotifyIcon : ":musical_note:"
        } ${track}**${name}**`
      );
    }
    if (item.type == "WATCHING") {
      const text = item.details ? `${item.details} - ` : "";
      const name = item.name;
      statuses.push(`:tv: ${text}**${name}**`);
    }
    if (item.type == "STREAMING") {
      const text = item.details ? `${item.details} - ` : "";
      const name = item.name;
      statuses.push(`:satellite: ${text}**${name}**`);
    }
  }
  return `${stat}${custom ? `\n${custom}` : ""}${
    statuses.length !== 0 ? `\n${statuses.sort().join("\n")}` : ""
  }`;
}
