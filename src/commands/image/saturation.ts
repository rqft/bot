import { Embeds } from '../../tools/embed';
import { Instances } from '../../tools/fetch';
import { handleError, respond } from '../../tools/util';
import { Command } from '../../wrap/builder';

export default Command(
  'saturation [image] [amount?] [-scale?]',
  {
    args: (self) => ({
      image: self.imageUrl({ size: 512 }),
      amount: self.number(),
      scale: self.booleanOptional(),
    }),
  },
  async (context, args) => {
    const payload = await Instances.self
      .imageSaturation(args.image, args.amount, args.scale)
      .then(handleError(context));

    return await respond(
      context,
      await Embeds.image(context, payload.unwrap(), 'saturation')
    );
  }
);
