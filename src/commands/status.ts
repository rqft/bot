import { MessageEmbed } from "discord.js";
import moment from "moment";
import fetch from "node-fetch";
import { capitalizeWords } from "../functions/capitalizeWords";
import { ICommand } from "../interfaces/ICommand";
import { CustomEmojis } from "../maps/customEmojis";

module.exports = {
  name: "status",
  description: "get discord status",
  usage: "",
  usesArgs: false,
  async run(msg) {
    const ret = await msg.reply(CustomEmojis.GUI_TYPING);
    try {
      const { channel } = msg;
      const { incidents } = await (
        await fetch("https://discordstatus.com/api/v2/incidents.json")
      ).json();
      await ret.delete();
      if (!incidents)
        return channel
          .send(
            "Could not get Discord status. Please visit <https://discordstatus.com>."
          )
          .catch((_e: any) => {});
      const latest = incidents[0];

      if (!latest)
        return channel.send("No active incidents.").catch((_e) => {});
      const {
        status,
        started_at,
        resolved_at,
        name,
        impact,
        incident_updates,
        components,
        shortlink,
      } = latest;

      if (resolved_at && moment().diff(resolved_at, "hours") >= 6)
        return channel.send("No active incidents.").catch((_e) => {});

      channel
        .send(
          new MessageEmbed({
            title: `${name}`,
            url: `${shortlink}`,
            footer: { text: "discordstatus.com" },
            color: getColor(status),
            description: `Status: **${capitalizeWords(status).replace(
              "_",
              " "
            )}**\nImpact: **${capitalizeWords(impact).replace(
              "_",
              " "
            )}**\n\nAffects: ${components
              .map((x: any) => `**${x.name}**`)
              .join(", ")}`,
            fields: incident_updates
              .map((x: any) => {
                const { status, body, created_at } = x;
                return {
                  name: `${capitalizeWords(status)} - ${moment(
                    created_at
                  ).fromNow()}`,
                  value: body,
                };
              })
              .slice(0, 10),
            timestamp: moment(started_at).toDate(),
          })
        )
        .catch((_e: any) => {});
    } catch (e) {
      try {
        const { channel } = msg;
        channel
          .send(
            "Could not get Discord status. Please visit <https://discordstatus.com>."
          )
          .catch((_e: any) => {});
      } catch (e) {}
    }
  },
} as ICommand;

function getColor(status: string) {
  switch (status) {
    case "resolved":
    case "completed":
      return "GREEN"; // green
    case "in_progress":
    case "monitoring":
      return "YELLOW"; // yellow
    case "investigating":
      return "ORANGE"; // orange
    case "identified":
      return "RED"; // red
    default:
      return "BLUE"; // light blue
  }
}
