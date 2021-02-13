import { ActivityOptions, VoiceChannel } from "discord.js";
import { client } from "..";
import { config } from "../config";
import { leaveBlacklistedGuilds } from "../logs/leaveBlacklistedGuilds";
import { makeConsoleDeployMessage } from "./makeConsoleDeployMessage";
import { makeDeployMessage } from "./makeDeployMessage";
export function onReady() {
  makeConsoleDeployMessage();
  makeDeployMessage(config.logs.starts.keys);
  (client.channels.cache.get(
    config.bot.presence.voiceChannel
  ) as VoiceChannel)!.join();
  console.log("ok");
  leaveBlacklistedGuilds();
  client.user?.setActivity(
    `${config.bot.presence.activity.name} | ${client.guilds.cache.size} Servers`,
    {
      name: `${config.bot.presence.activity.name} | ${client.guilds.cache.size} Servers`,
      type: config.bot.presence.activity.type as ActivityOptions["type"],
      url: config.bot.presence.activity.url,
    }
  );
}
