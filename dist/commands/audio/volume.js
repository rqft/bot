"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("../../tools/fetch");
const util_1 = require("../../tools/util");
const builder_1 = require("../../wrap/builder");
exports.default = (0, builder_1.Command)('volume [audio] [amount]', {
    args: (self) => ({
        audio: self.audioUrl(),
        amount: self.number(),
    }),
}, async (context, args) => {
    const payload = await fetch_1.Instances.self
        .audioVolume(args.audio, args.amount)
        .then((0, util_1.handleError)(context));
    return await (0, util_1.respond)(context, {
        files: [{ filename: 'volume.mp3', value: payload.unwrap() }],
    });
});
