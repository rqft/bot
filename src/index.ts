import fetch from 'node-fetch';
import { emojis } from './constants';
import { commands, self } from './globals';
(async (): Promise<void> => {
  emojis.push(
    ...(await fetch(
      'https://raw.githubusercontent.com/abourtnik/emojis-world/master/scripts/emojis.json'
    ).then((x) => x.json()))
  );
  console.log('waiting');
  const z = performance.now();
  commands.addMultipleIn('./commands', { subdirectories: true });
  await commands.run();
  
  console.log('ok!', z, 'ms');
  await self.run();
})();

process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);
