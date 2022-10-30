import { Embeds } from '../../../tools/embed';
import { Instances } from '../../../tools/fetch';
import { handleError, respond } from '../../../tools/util';
import { dimg } from '../../../wrap/base-command';
import { Command } from '../../../wrap/builder';

export default Command(
  'overlay [source] [target]',
  {
    args: (self) => ({
      source: self.imageUrl({ size: 512 }),
      target: self.imageUrl({ size: 512 }),
    }),
    metadata: dimg('overlay an image over another, showing both'),
  },
  async (context, args) => {
    const payload = await Instances.self
      .imageDualOverlay(args.source, args.target)
      .then(handleError(context));

    return await respond(
      context,
      await Embeds.image(context, payload.unwrap(), 'overlay')
    );
  }
);
