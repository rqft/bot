import type { Rqft } from '@rqft/fetch';
import { Embeds } from '../../tools/embed';
import { Instances } from '../../tools/fetch';
import { handleError, respond } from '../../tools/util';
import { Command } from '../../wrap/builder';

export default Command(
  'resize [image] [size]',
  {
    args: (self) => ({
      image: self.imageUrl({ size: 512 }),
      size: self.string(),
    }),
  },
  async (context, args) => {
    const payload = await Instances.self
      .imageResize(args.image, args.size as Rqft.Size)
      .then(handleError(context));

    return await respond(
      context,
      await Embeds.image(context, payload.unwrap(), 'resize')
    );
  }
);
