"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("@rqft/fetch");
const fetch_2 = require("../tools/fetch");
const util_1 = require("../tools/util");
const warning_1 = require("../tools/warning");
const builder_1 = require("../wrap/builder");
exports.default = (0, builder_1.Command)('math [...expressions]', {
    args: (self) => ({
        expressions: self.string(),
    }),
}, async (context, args) => {
    const { payload } = await fetch_2.Instances.self.math(args.expressions);
    if (payload.status.state === fetch_1.APIs.Jonathan.ResultState.ERROR) {
        throw new warning_1.Warning(payload.status.message);
    }
    return await (0, util_1.respond)(context, String(payload.data));
});