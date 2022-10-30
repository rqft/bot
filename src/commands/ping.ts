import { respond } from '../tools/util';
import { Command } from '../wrap/builder';

export default Command(
  'ping',
  {
    metadata: {
      description: 'pong',
      examples: [],
      type: 'miscellaneous',
    },
  },
  async (context) => {
    const { rest, gateway } = await context.client.ping();
    return await respond.fmt(
      context,
      'pong (rest: {rest}ms) (gateway: {gateway}ms)',
      {
        rest,
        gateway,
      }
    );
  }
);
