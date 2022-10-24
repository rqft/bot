import fetch from 'node-fetch';
import { emojis } from './constants';
import { commands, self } from './globals';
(async (): Promise<void> => {
  emojis.push(
    ...(await fetch(
      'https://raw.githubusercontent.com/abourtnik/emojis-world/master/scripts/emojis.json'
    ).then((x) => x.json()))
  );
  commands.addMultipleIn('./commands', { subdirectories: true });
  await commands.run();
  await self.run();
})();

process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);
