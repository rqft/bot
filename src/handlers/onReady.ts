import { config } from "../config";
import { client } from "../index";
import { leaveBlacklistedGuilds } from "../logs/leaveBlacklistedGuilds";

export function onReady(): () => void {
  return () => {
    leaveBlacklistedGuilds();
    client.user?.setActivity(config.bot.presence.activity.name, {
      name: "H",
      type: "STREAMING",
      url:
        "https://www.youtube.com/watch?v=db_sYdSPD24&ab_channel=FalseNoise-Topic",
    });
    console.log("Ready");
  };
}
