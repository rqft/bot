"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const embed_1 = require("../tools/embed");
const fetch_1 = require("../tools/fetch");
const util_1 = require("../tools/util");
const builder_1 = require("../wrap/builder");
exports.default = (0, builder_1.Command)('plot [expressions] [-s?=3] [-scale?=50] [-dm?] [-dx?] [-rm?] [-rx?] [-size?=1024]', {
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
}, async (context, args) => {
    const payload = await fetch_1.Instances.self
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
        .then((0, util_1.handleError)(context));
    console.log(payload.unwrap());
    const embed = embed_1.Embeds.user(context);
    console.log(typeof embed);
    let text = (0, util_1.fmt)('Scale: {scale}x', { scale: args.scale });
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
    return await (0, util_1.respond)(context, await embed_1.Embeds.image(context, payload.unwrap(), 'plot', embed));
});
