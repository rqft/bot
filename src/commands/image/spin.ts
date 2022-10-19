import { Embeds } from '../../tools/embed';
import { Instances } from '../../tools/fetch';
import { respond } from '../../tools/util';
import { Command } from '../../wrap/builder';

export default Command(
  'spin [image]',
  {
    args: (self) => ({ image: self.imageUrl() }),
  },
  async (context, args) => {
    const { payload } = await Instances.self.imageSpin(args.image);

    console.log(args.image);

    return await respond(
      context,
      await Embeds.image(context, payload, 'spin.gif')
    );
  }
);