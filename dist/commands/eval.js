"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("typescript");
const util_1 = require("util");
const util_2 = require("../tools/util");
const builder_1 = require("../wrap/builder");
exports.default = (0, builder_1.Command)("eval [...code]", { args: (self) => ({ code: self.string() }) }, async (context, args) => {
    if (!context.user.isClientOwner) {
        return;
    }
    let data;
    try {
        data = await Promise.resolve(eval((0, typescript_1.transpile)(args.code)));
    }
    catch (e) {
        data = e;
    }
    return await util_2.respond.fmt(context, "```js\n{data}\n```", {
        data: (0, util_1.inspect)(data, { depth: 3, showProxy: true }),
    });
});
