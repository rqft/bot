"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("detritus-client/lib/utils");
const constants_1 = require("../constants");
const embed_1 = require("../tools/embed");
const paginator_1 = require("../tools/paginator");
const util_1 = require("../tools/util");
const warning_1 = require("../tools/warning");
const base_command_1 = require("../wrap/base-command");
const builder_1 = require("../wrap/builder");
exports.default = (0, builder_1.Command)('help [command?]', {
    args: (self) => ({ command: self.stringOptional() }),
    metadata: {
        description: 'evaluate some code',
        examples: ['1 + 1 // what is it', 'let a: 1 = 1; a'],
        type: 'miscellaneous',
    },
}, async (context, args) => {
    const embed = embed_1.Embeds.user(context);
    const { commands } = context.commandClient;
    if (args.command) {
        const command = commands.find((x) => x.name.toLowerCase().includes(args.command?.toLowerCase() || '') ||
            x.aliases.includes(args.command?.toLowerCase() || ''));
        if (command === undefined) {
            throw new warning_1.Warning(`Unknown command '${args.command}'`);
        }
        embed.setTitle(`${constants_1.tail} Command Information`);
        const { name, aliases, metadata, syntax } = command;
        {
            const description = [];
            description.push(utils_1.Markup.italics(metadata.description) + '\n');
            description.push((0, util_1.fmt)('**Name**: {name}', { name }));
            if (aliases.length > 0) {
                description.push((0, util_1.fmt)('**Aliases**: {aliases}', { aliases }));
            }
            description.push(utils_1.Markup.codeblock(syntax));
            embed.setDescription(description.join('\n'));
            description.push((0, util_1.fmt)('**Type**: {type}', { type: metadata.type }));
        }
        if (metadata.examples.length > 0) {
            embed.addField(`${constants_1.tail} Examples`, utils_1.Markup.codeblock(metadata.examples.join('\n')));
        }
        return await (0, util_1.respond)(context, { embed });
    }
    const c = {};
    for (const type of Object.values(base_command_1.CommandType)) {
        const p = context.commandClient.commands.filter((x) => {
            return x.metadata.type === type;
        });
        const longest = p.reduce((p, v) => (p < v.name.length ? v.name.length : p), 0);
        const z = p.map((x) => (0, util_1.ansifySyntax)(x.syntax, longest));
        if (z.length > 0) {
            c[type] = utils_1.Markup.codeblock(z.join('\n'), { language: 'ansi' });
        }
    }
    const keys = Object.keys(c);
    const paginator = new paginator_1.Paginator(context, {
        pageLimit: keys.length,
        onPage(page) {
            const embed = embed_1.Embeds.user(context);
            embed.setTitle(keys[page - 1] || '');
            embed.setDescription(c[keys[page - 1] || base_command_1.CommandType.Miscellaneous] || '');
            return embed;
        },
    });
    return await paginator.start();
});
