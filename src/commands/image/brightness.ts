import { Embeds } from '../../tools/embed';
import { Instances } from '../../tools/fetch';
import { handleError, respond } from '../../tools/util';
import { img } from '../../wrap/base-command';
import { Command } from '../../wrap/builder';

export default Command(
  'brightness [image] [amount?] [-scale?]',
  {
    args: (self) => ({
      image: self.imageUrl({ size: 512 }),
      amount: self.number(),
      scale: self.booleanOptional(),
    }),
    metadata: img('set brightness of image', ['2', '2 -scale', '2', '2']),
  },
  async (context, args) => {
    const payload = await Instances.self
      .imageBrightness(args.image, args.amount, args.scale)
      .then(handleError(context));

    return await respond(
      context,
      await Embeds.image(context, payload.unwrap(), 'brightness')
    );
  }
);
