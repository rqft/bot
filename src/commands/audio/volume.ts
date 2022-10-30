import { Instances } from '../../tools/fetch';
import { handleError, respond } from '../../tools/util';
import { Command } from '../../wrap/builder';

export default Command(
  'volume [audio] [amount]',
  {
    args: (self) => ({
      audio: self.audioUrl(),
      amount: self.number(),
    }),
    metadata: {
      description: 'set the volume of an audio file',
      examples: [],
      type: 'audio',
    },
  },
  async (context, args) => {
    const payload = await Instances.self
      .audioVolume(args.audio, args.amount)
      .then(handleError(context));

    return await respond(context, {
      files: [{ filename: 'volume.mp3', value: payload.unwrap() }],
    });
  }
);
