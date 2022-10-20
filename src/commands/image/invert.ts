import { APIs } from '@rqft/fetch';
import { Embeds } from '../../tools/embed';
import { Instances } from '../../tools/fetch';
import { respond } from '../../tools/util';
import { Command } from '../../wrap/builder';

export default Command(
  'invert [image] [-method=invert]',
  {
    args: (self) => ({
      image: self.imageUrl(),
      method: self.stringOptional({
        choices: Object.values(APIs.Jonathan.InvertMethods),
      }),
    }),
  },
  async (context, args) => {
    const { payload } = await Instances.self.imageInvert(
      args.image,
      args.method as APIs.Jonathan.InvertMethods
    );

    return await respond(
      context,
      await Embeds.image(context, payload, 'invert.gif')
    );
  }
);
