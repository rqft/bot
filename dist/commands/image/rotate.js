"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const embed_1 = require("../../tools/embed");
const fetch_1 = require("../../tools/fetch");
const util_1 = require("../../tools/util");
const base_command_1 = require("../../wrap/base-command");
const builder_1 = require("../../wrap/builder");
exports.default = (0, builder_1.Command)('rotate [image] [deg]', {
    args: (self) => ({
        image: self.imageUrl({ size: 512 }),
        deg: self.integer(),
    }),
    metadata: (0, base_command_1.img)('rotate an image', ['45', '90', '180', '270']),
}, async (context, args) => {
    const payload = await fetch_1.Instances.self
        .imageRotate(args.image, args.deg)
        .then((0, util_1.handleError)(context));
    return await (0, util_1.respond)(context, await embed_1.Embeds.image(context, payload.unwrap(), 'rotate'));
});
