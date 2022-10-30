"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../tools/util");
const builder_1 = require("../wrap/builder");
exports.default = (0, builder_1.Command)('ping', {
    metadata: {
        description: 'pong',
        examples: [],
        type: 'miscellaneous',
    },
}, async (context) => {
    const { rest, gateway } = await context.client.ping();
    return await util_1.respond.fmt(context, 'pong (rest: {rest}ms) (gateway: {gateway}ms)', {
        rest,
        gateway,
    });
});
