"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const embed_1 = require("../../tools/embed");
const fetch_1 = require("../../tools/fetch");
const util_1 = require("../../tools/util");
const builder_1 = require("../../wrap/builder");
exports.default = (0, builder_1.Command)("spin [image]", {
    args: (self) => ({ image: self.imageUrl() }),
}, async (context, args) => {
    const { payload } = await fetch_1.Instances.self.imageSpin(args.image);
    console.log(args.image);
    return await (0, util_1.respond)(context, await embed_1.Embeds.image(context, payload, "spin.gif"));
});
