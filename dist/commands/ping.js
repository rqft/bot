"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../wrap/builder");
exports.default = (0, builder_1.Command)("ping [arg]", { args: (self) => ({ arg: self.string() }) }, async (context) => {
    return context.editOrReply("hi");
});
