import { Embeds } from '../../tools/embed';
import { fmt, respond } from '../../tools/util';
import { Command } from '../../wrap/builder';

export default Command(
  'color [color] [-size=512x512]',
  {
    args: (self) => ({
      color: self.string(),
      size: self.string(),
    }),
  },
  async (context, args) => {
    // const payload = await Instances.self.imageColor(
    //   args.size as Rqft.Size,
    //   args.color
    // );

    // return await Embeds.image(context, payload.unwrap(), 'color');

    // shit is super randomly broken
    const embed = Embeds.user(context);

    embed.setImage(
      fmt('https://api.clancy.lol/image/color/{size}/{color}', args)
    );

    return await respond(context, { embed });
  }
);
