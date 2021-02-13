import RPC from "discord-rpc";
import { pid } from "process";
import { config } from "../config";
export function setUserPresence() {
  const RPCClient = new RPC.Client({ transport: "ipc" });
  RPCClient.on("ready", () => {
    RPCClient.request("SET_ACTIVITY", {
      pid: pid,
      activity: {
        assets: {
          large_image: "glasses",
          large_text: "uwu",
        },
        buttons: [
          {
            label: "[Pylon]",
            url: "https://pylon.bot/",
          },
          {
            label: "Invite the bot",
            url:
              "https://discord.com/api/oauth2/authorize?client_id=760143615124439040&permissions=8&scope=bot",
          },
        ],
      },
    });
  });
  RPCClient.login({ clientId: config.bot.application.clientId });
}
