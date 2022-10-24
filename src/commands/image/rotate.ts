import { Embeds } from '../../tools/embed';
import { Instances } from '../../tools/fetch';
import { handleError, respond } from '../../tools/util';
import { Command } from '../../wrap/builder';

export default Command(
  'rotate [image] [deg]',
  {
    args: (self) => ({
      image: self.imageUrl({ size: 512 }),
      deg: self.integer(),
    }),
  },
  async (context, args) => {
    const payload = await Instances.self
      .imageRotate(args.image, args.deg)
      .then(handleError(context));

    return await respond(
      context,
      await Embeds.image(context, payload.unwrap(), 'rotate')
    );
  }
);
