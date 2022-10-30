import { Embeds } from '../../tools/embed';
import { Instances } from '../../tools/fetch';
import { handleError, respond } from '../../tools/util';
import { img } from '../../wrap/base-command';
import { Command } from '../../wrap/builder';

export default Command(
  'deepfry [image] [-threshold=100]',
  {
    args: (self) => ({
      image: self.imageUrl({ size: 512 }),
      threshold: self.integer(),
    }),
    metadata: img('the funny.', ['', '-threshold 100', '', ''])
  },
  async (context, args) => {
    const payload = await Instances.self
      .imageDeepfry(args.image, args.threshold)
      .then(handleError(context));

    return await respond(
      context,
      await Embeds.image(context, payload.unwrap(), 'deepfry')
    );
  }
);
