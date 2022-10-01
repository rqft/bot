import fetch from "node-fetch";
import { emojis } from "./constants";
import { commands } from "./globals";
(async () => {
  emojis.push(
    ...(await fetch(
      "https://raw.githubusercontent.com/abourtnik/emojis-world/master/scripts/emojis.json"
    ).then((x) => x.json()))
  );
  commands.addMultipleIn("./commands", { subdirectories: true });
  await commands.run();
})();
