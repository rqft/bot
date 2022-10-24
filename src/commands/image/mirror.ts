import { Rqft } from '@rqft/fetch';
import { Embeds } from '../../tools/embed';
import { Instances } from '../../tools/fetch';
import { handleError, respond } from '../../tools/util';
import { Command } from '../../wrap/builder';

export default Command(
  'mirror [image] [-type=left]',
  {
    args: (self) => ({
      image: self.imageUrl({ size: 512 }),
      type: self.string({
        choices: Object.values(Rqft.MirrorMethods),
      }),
    }),
  },
  async (context, args) => {
    const payload = await Instances.self
      .imageMirror(args.image, args.type.toUpperCase() as Rqft.MirrorMethods)
      .then(handleError(context));

    return await respond(
      context,
      await Embeds.image(context, payload.unwrap(), 'mirror')
    );
  }
);
