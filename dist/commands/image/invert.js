"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("@rqft/fetch");
const embed_1 = require("../../tools/embed");
const fetch_2 = require("../../tools/fetch");
const util_1 = require("../../tools/util");
const builder_1 = require("../../wrap/builder");
exports.default = (0, builder_1.Command)('invert [image] [-method=invert]', {
    args: (self) => ({
        image: self.imageUrl({ size: 512 }),
        method: self.stringOptional({
            choices: Object.values(fetch_1.APIs.Jonathan.InvertMethods),
        }),
    }),
}, async (context, args) => {
    const { payload } = await fetch_2.Instances.self.imageInvert(args.image, args.method);
    return await (0, util_1.respond)(context, await embed_1.Embeds.image(context, payload, 'invert'));
});
