import { Embeds } from '../../tools/embed';
import { Instances } from '../../tools/fetch';
import { fmt, respond } from '../../tools/util';
import { Command } from '../../wrap/builder';

export default Command(
  'average-color [image]',
  {
    args: (self) => ({
      image: self.imageUrl({ size: 512 }),
    }),
  },
  async (context, args) => {
    const payload = await Instances.self.imageAverageColor(args.image);

    const color = payload.unwrap().data.toString(16).padStart(8);

    const embed = Embeds.user(context);
    embed.setDescription(fmt('Color: #{color}', { color }));
    embed.setImage('https://api.clancy.lol/image/color/256/' + color);
    embed.setThumbnail(args.image);

    return await respond(context, { embed });
  }
);
