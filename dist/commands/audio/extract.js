"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("../../tools/fetch");
const util_1 = require("../../tools/util");
const builder_1 = require("../../wrap/builder");
exports.default = (0, builder_1.Command)('extract [video]', {
    args: (self) => ({
        video: self.videoUrl(),
    }),
    metadata: {
        description: 'extract audio from a video',
        examples: [],
        type: 'audio',
    },
}, async (context, args) => {
    const payload = await fetch_1.Instances.self
        .audioExtract(args.video)
        .then((0, util_1.handleError)(context));
    return await (0, util_1.respond)(context, {
        files: [{ filename: 'extract.mp3', value: payload.unwrap() }],
    });
});
