import {
  GatewayActivityTypes,
  GatewayPresenceStatuses,
} from "detritus-client-socket/lib/constants";
import {} from "pariah";
import { Logger } from "./functions/logger";
import { altclients, client, commands, selfclient } from "./globals";

commands.addMultipleIn("/commands/prefixed", { subdirectories: true });

// interactions.addMultipleIn("/commands/interactions", { subdirectories: true });

(async function run() {
  await commands.run();
  const logger = new Logger(commands);

  // await interactions.run();
  const all = [client, selfclient, ...altclients];
  console.log("");
  for (const client of all) {
    const logger = new Logger(client);
    await client.run();
    logger.attach();
  }

  logger.log(
    "Commands > Load",
    ["yellow", "bold"],
    `Loaded ${commands.commands.length} commands`
  );

  selfclient.gateway.setPresence({
    activities: [
      {
        name: "Custom Status",
        type: GatewayActivityTypes.CUSTOM_STATUS,
        state:
          "jeez, its a breeze, breaking records every week, now we poppin' try to stop me, bodies droppin' no one sees | rqft.space",
        emoji: {
          id: "822230299618312245",
          animated: false,
          name: "femboy",
        },
      },
      {
        name: "sovv",
        type: GatewayActivityTypes.LISTENING,
        applicationId: "760143615124439040",
      },
    ],
    status: GatewayPresenceStatuses.DND,
    afk: false,
    since: 0,
  });
})();
