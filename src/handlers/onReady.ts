import { VoiceChannel } from "discord.js";
import { client } from "..";
import { config } from "../config";
import { leaveBlacklistedGuilds } from "../logs/leaveBlacklistedGuilds";
import { makeConsoleDeployMessage } from "./makeConsoleDeployMessage";
import { makeDeployMessage } from "./makeDeployMessage";
export async function onReady() {
  makeConsoleDeployMessage();
  makeDeployMessage(config.logs.starts.keys);
  const ch = client.channels.cache.get(
    config.bot.presence.voiceChannel
  ) as VoiceChannel;
  const connection = await ch.join();
  connection.setSpeaking("PRIORITY_SPEAKING");

  console.log("ok");
  leaveBlacklistedGuilds();
}
