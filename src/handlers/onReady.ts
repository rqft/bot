import { VoiceChannel } from "discord.js";
import { client } from "..";
import { config } from "../config";
import { leaveBlacklistedGuilds } from "../logs/leaveBlacklistedGuilds";
import { makeConsoleDeployMessage } from "./makeConsoleDeployMessage";
import { makeDeployMessage } from "./makeDeployMessage";
export async function onReady() {
  const start = Date.now();
  makeConsoleDeployMessage();
  makeDeployMessage(config.logs.starts.keys);
  const ch = client.channels.cache.get(
    config.bot.presence.voiceChannel
  ) as VoiceChannel;
  const connection = await ch.join();
  connection.setSpeaking("SPEAKING");

  console.log(`took ${Date.now() - start}ms to complete`);
  leaveBlacklistedGuilds();
}
