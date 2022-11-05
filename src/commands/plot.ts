import { Embeds } from '../tools/embed';
import { Instances } from '../tools/fetch';
import { fmt, handleError, respond } from '../tools/util';
import { Command } from '../wrap/builder';

export default Command(
  'plot [expressions] [-s?=3] [-scale?=50] [-dm?] [-dx?] [-rm?] [-rx?] [-size?=1024]',
  {
    args: (self) => ({
      expressions: self.string(),
      s: self.integerOptional(),
      scale: self.integerOptional(),
      dm: self.stringOptional(),
      dx: self.stringOptional(),
      rm: self.stringOptional(),
      rx: self.stringOptional(),
      size: self.integerOptional(),
    }),
    metadata: {
      description: 'bootleg desmos',
      examples: ['sin(x)', 'cos(x/2) -scale 10', '2x -dm -10 -dx 10'],
      type: 'miscellaneous',
    },
  },
  async (context, args) => {
    const payload = await Instances.self
      .graph({
        expr: args.expressions,
        splot: args.s,
        scale: args.scale,
        size: args.size,
        dm: args.dm,
        dx: args.dx,
        rm: args.rm,
        rx: args.rx,
      })
      .then(handleError(context));

    console.log(payload.unwrap());

    const embed = Embeds.user(context);

    console.log(typeof embed);

    let text = fmt('Scale: {scale}x', { scale: args.scale });

    if (args.dm || args.dx) {
      text += '\nDomain: ';

      if (args.dm) {
        text += `${args.dm} < `;
      }

      text += 'x';

      if (args.dx) {
        text += ` < ${args.dx}`;
      }
    }

    if (args.rm || args.rx) {
      text += '\nRange: ';

      if (args.rm) {
        text += `${args.rm} < `;
      }

      text += 'y';

      if (args.rx) {
        text += ` < ${args.rx}`;
      }
    }

    console.log(text);
    embed.setDescription(text);

    // await respond(context, {
    //   embeds: [{ image: { url: 'attachment://plot.png' } }],
    //   files: [{ value: payload.unwrap(), filename: 'plot.png' }],
    // });

    return await respond(context, await Embeds.image(context, payload.unwrap(), 'plot', embed));
  }
);
