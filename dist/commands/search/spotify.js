"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../../wrap/builder");
exports.default = (0, builder_1.Command)('spotify [...query]', {
    args: (self) => ({
        query: self.string(),
    }),
}, async (context, args) => {
});
