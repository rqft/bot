import { commands } from "./globals";

(async () => {
  commands.addMultipleIn("./commands", { subdirectories: true });
  await commands.run();
})();
