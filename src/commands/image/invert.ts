import { Rqft } from '@rqft/fetch';
import { Embeds } from '../../tools/embed';
import { Instances } from '../../tools/fetch';
import { handleError, respond } from '../../tools/util';
import { Command } from '../../wrap/builder';
export default Command(
  'invert [image] [-type=invert]',
  {
    args: (self) => ({
      image: self.imageUrl({ size: 512 }),
      type: self.stringOptional({
        choices: Object.values(Rqft.InvertMethods),
      }),
    }),
  },
  async (context, args) => {
    const payload = await Instances.self
      .imageInvert(args.image, args.type as Rqft.InvertMethods)
      .then(handleError(context));

    return await respond(
      context,
      await Embeds.image(context, payload.unwrap(), 'invert')
    );
  }
);
