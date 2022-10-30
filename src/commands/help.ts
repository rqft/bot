import { Markup } from 'detritus-client/lib/utils';
import { tail } from '../constants';
import { Embeds } from '../tools/embed';
import { fmt, respond } from '../tools/util';
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
      const z = context.commandClient.commands
        .filter((x) => {
          if (!x.metadata) {
            console.error(x.name, 'missing metadata');
            return false;
          }

          return x.metadata.type === type;
        })
        .map((x) => x.name);

      if (z.length > 0) {
        c[type] = Markup.codeblock(z.join(', '));
      }
    }

    return await respond(
      context,
      Object.entries(c)
        .map(([n, v]) => `**${n}**${v}`)
        .join('\n')
    );
  }
);
