import { Embeds } from '../../tools/embed';
import { Instances } from '../../tools/fetch';
import { handleError, respond } from '../../tools/util';
import { img } from '../../wrap/base-command';
import { Command } from '../../wrap/builder';

export default Command(
  'spin [image]',
  {
    args: (self) => ({ image: self.imageUrl({ size: 512 }) }),
    metadata: img('spinny.'),
  },
  async (context, args) => {
    const payload = await Instances.self
      .imageSpin(args.image)
      .then(handleError(context));

    return await respond(
      context,
      await Embeds.image(context, payload.unwrap(), 'spin')
    );
  }
);
