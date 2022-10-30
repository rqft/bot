"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("@rqft/fetch");
const embed_1 = require("../../tools/embed");
const fetch_2 = require("../../tools/fetch");
const util_1 = require("../../tools/util");
const base_command_1 = require("../../wrap/base-command");
const builder_1 = require("../../wrap/builder");
exports.default = (0, builder_1.Command)('invert [image] [-type=invert]', {
    args: (self) => ({
        image: self.imageUrl({ size: 512 }),
        type: self.stringOptional({
            choices: Object.values(fetch_1.Rqft.InvertMethods),
        }),
    }),
    metadata: (0, base_command_1.img)('invert the image..')
}, async (context, args) => {
    const payload = await fetch_2.Instances.self
        .imageInvert(args.image, args.type)
        .then((0, util_1.handleError)(context));
    return await (0, util_1.respond)(context, await embed_1.Embeds.image(context, payload.unwrap(), 'invert'));
});
