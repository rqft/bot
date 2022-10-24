import { Instances } from '../../tools/fetch';
import { handleError, respond } from '../../tools/util';
import { Command } from '../../wrap/builder';

export default Command(
  'extract [video]',
  {
    args: (self) => ({
      video: self.videoUrl(),
    }),
  },
  async (context, args) => {
    const payload = await Instances.self
      .audioExtract(args.video)
      .then(handleError(context));

    return await respond(context, {
      files: [{ filename: 'extract.mp3', value: payload.unwrap() }],
    });
  }
);
