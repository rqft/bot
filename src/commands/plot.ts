import { Embeds } from '../tools/embed';
import { Instances } from '../tools/fetch';
import { fmt, respond } from '../tools/util';
import { Warning } from '../tools/warning';
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
  },
  async (context, args) => {
    const { payload } = await Instances.self.graph(args.expressions, {
      splot: args.s,
      scale: args.scale,
      size: args.size,
      dm: args.dm,
      dx: args.dx,
      rm: args.rm,
      rx: args.rx,
    });

    const txt = new TextDecoder().decode(payload);

    let j = null;
    try {
      j = JSON.parse(txt);
    } catch {
      void 0;
    }

    if (j !== null) {
      throw new Warning(j.status.message);
    }

    const embed = Embeds.user(context);

    embed.setImage('attachment://plot.png');

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

    embed.setDescription(text);

    embed.setFooter(
      fmt('{size}x{size}, Graph of f(x) = {expressions}', {
        size: args.size,
        expressions: args.expressions.split(';').join(' # '),
      })
    );

    return await respond(context, {
      embeds: [embed],
      files: [{ filename: 'plot.png', value: payload }],
    });
  }
);
