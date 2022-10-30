"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const embed_1 = require("../../tools/embed");
const util_1 = require("../../tools/util");
const builder_1 = require("../../wrap/builder");
exports.default = (0, builder_1.Command)('color [color] [-size=512x512]', {
    args: (self) => ({
        color: self.string(),
        size: self.string(),
    }),
    metadata: {
        description: 'generate a color image',
        examples: ['ffffff -size 512x512', 'ff0 -size 100', '66a8'],
        type: 'miscellaneous',
    },
}, async (context, args) => {
    const embed = embed_1.Embeds.user(context);
    embed.setImage((0, util_1.fmt)('https://api.clancy.lol/image/color/{size}/{color}', args));
    return await (0, util_1.respond)(context, { embed });
});
