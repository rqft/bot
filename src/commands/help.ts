import type { Embed } from 'detritus-client/lib/utils';
import { Markup } from 'detritus-client/lib/utils';
import { tail } from '../constants';
import { Embeds } from '../tools/embed';
import { Paginator } from '../tools/paginator';
import { ansifySyntax, fmt, respond } from '../tools/util';
import { Warning } from '../tools/warning';
import type { BaseCommand } from '../wrap/base-command';
import { CommandType } from '../wrap/base-command';
import { Command } from '../wrap/builder';
export default Command(
  'help [command?]',
  {
    args: (self) => ({ command: self.stringOptional() }),
    metadata: {
      description: 'evaluate some code',
      examples: ['1 + 1 // what is it', 'let a: 1 = 1; a'],
      type: 'miscellaneous',
    },
  },
  async (context, args) => {
    const embed = Embeds.user(context);
    const { commands } = context.commandClient;
    if (args.command) {
      const command: BaseCommand<Record<string, unknown>> | undefined =
        commands.find(
          (x) =>
            x.name.toLowerCase().includes(args.command?.toLowerCase() || '') ||
            x.aliases.includes(args.command?.toLowerCase() || '')
        ) as BaseCommand<Record<string, unknown>> | undefined;

      if (command === undefined) {
        throw new Warning(`Unknown command '${args.command}'`);
      }

      embed.setTitle(`${tail} Command Information`);

      const { name, aliases, metadata, syntax } = command;
      {
        const description: Array<string> = [];
        description.push(Markup.italics(metadata.description) + '\n');
        description.push(fmt('**Name**: {name}', { name }));

        if (aliases.length > 0) {
          description.push(fmt('**Aliases**: {aliases}', { aliases }));
        }

        description.push(Markup.codeblock(syntax));
        embed.setDescription(description.join('\n'));

        description.push(fmt('**Type**: {type}', { type: metadata.type }));
      }

      if (metadata.examples.length > 0) {
        embed.addField(
          `${tail} Examples`,
          Markup.codeblock(metadata.examples.join('\n'))
        );
      }

      return await respond(context, { embed });
    }

    const c: Partial<Record<CommandType, string>> = {};

    for (const type of Object.values(CommandType)) {
      const p = context.commandClient.commands.filter((x) => {
        return x.metadata.type === type;
      });

      const longest = p.reduce(
        (p, v) => (p < v.name.length ? v.name.length : p),
        0
      );
      const z = p.map((x) =>
        ansifySyntax((x as BaseCommand<never>).syntax, longest)
      );

      if (z.length > 0) {
        c[type] = Markup.codeblock(z.join('\n'), { language: 'ansi' });
      }
    }

    const keys = Object.keys(c) as Array<CommandType>;

    const paginator = new Paginator(context, {
      pageLimit: keys.length,
      onPage(page: number): Embed {
        const embed = Embeds.user(context);
        embed.setTitle(keys[page - 1] || '');

        embed.setDescription(
          c[keys[page - 1] || CommandType.Miscellaneous] || ''
        );

        return embed;
      },
    });

    return await paginator.start();
  }
);
