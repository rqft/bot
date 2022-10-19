import { APIs } from '@rqft/fetch';
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
  },
  async (context, args) => {
    const { payload } = await Instances.self.math(args.expressions);

    if (payload.status.state === APIs.Jonathan.ResultState.ERROR) {
      throw new Warning(payload.status.message);
    }

    return await respond(context, String(payload.data));
  }
);
