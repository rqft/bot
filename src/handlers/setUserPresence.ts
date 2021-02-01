import RPC from "discord-rpc";
import { pid } from "process";
import { config } from "../config";

export function setUserPresence() {
  const cc = new RPC.Client({
    transport: "ipc",
  });

  cc.on("ready", () => {
    cc.request("SET_ACTIVITY", {
      pid: pid,
      activity: {
        assets: {
          large_image: "glasses",
        },
        buttons: [
          {
            label: "<3",
            url: "https://arcy-at.github.io/page/cutie",
          },
          {
            label: "hi",
            url:
              "https://discord.com/api/oauth2/authorize?client_id=760143615124439040&permissions=8&scope=bot",
          },
        ],
      },
    });
  });
  cc.login({ clientId: config.bot.application.clientId });
}
