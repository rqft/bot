import { Embeds } from '../../tools/embed';
import { Instances } from '../../tools/fetch';
import { handleError, respond } from '../../tools/util';
import { img } from '../../wrap/base-command';
import { Command } from '../../wrap/builder';

export default Command(
  'fisheye [image] [amount?]',
  {
    args: (self) => ({
      image: self.imageUrl({ size: 512 }),
      amount: self.number(),
    }),
    metadata: img('add a fisheye effect', ['10', '10', '0.5', '0.5']),
  },
  async (context, args) => {
    const payload = await Instances.self
      .imageFisheye(args.image, args.amount)
      .then(handleError(context));

    return await respond(
      context,
      await Embeds.image(context, payload.unwrap(), 'fisheye')
    );
  }
);
