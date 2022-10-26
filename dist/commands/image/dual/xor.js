"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const embed_1 = require("../../../tools/embed");
const fetch_1 = require("../../../tools/fetch");
const util_1 = require("../../../tools/util");
const builder_1 = require("../../../wrap/builder");
exports.default = (0, builder_1.Command)('xor [source] [target]', {
    args: (self) => ({
        source: self.imageUrl({ size: 512 }),
        target: self.imageUrl({ size: 512 }),
    }),
}, async (context, args) => {
    const payload = await fetch_1.Instances.self
        .imageDualXor(args.source, args.target)
        .then((0, util_1.handleError)(context));
    return await (0, util_1.respond)(context, await embed_1.Embeds.image(context, payload.unwrap(), 'xor'));
});
