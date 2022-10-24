import { Embeds } from '../../tools/embed';
import { Instances } from '../../tools/fetch';
import { handleError, respond } from '../../tools/util';
import { Command } from '../../wrap/builder';

export default Command(
  'tilt [image] [-amount?]',
  {
    args: (self) => ({
      image: self.imageUrl({ size: 512 }),
      amount: self.number(),
    }),
  },
  async (context, args) => {
    const payload = await Instances.self
      .imageTilt(args.image, args.amount)
      .then(handleError(context));

    return await respond(
      context,
      await Embeds.image(context, payload.unwrap(), 'tilt')
    );
  }
);
