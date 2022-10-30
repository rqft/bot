import type { Payload } from '@rqft/fetch';
import { Rqft } from '@rqft/fetch';
import { Instances } from '../tools/fetch';
import { respond } from '../tools/util';
import { Warning } from '../tools/warning';

import { Command } from '../wrap/builder';

export default Command(
  'math [...expressions]',
  {
    args: (self) => ({
      expressions: self.string(),
    }),
    metadata: {
      description: 'evaluate math',
      examples: ['1 + 1', 'sin(10)'],
      type: 'miscellaneous',
    },
  },
  async (context, args) => {
    const payload: Payload<Rqft.Result<string>> = await Instances.self.math(
      args.expressions
    );

    const id = payload.unwrap();
    if (id.status.state === Rqft.ResultState.ERROR) {
      throw new Warning(id.status.message);
    }

    return await respond(context, String(id.data));
  }
);
