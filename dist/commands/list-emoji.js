"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imagescript_1 = require("imagescript");
const node_fetch_1 = __importDefault(require("node-fetch"));
const builder_1 = require("../wrap/builder");
exports.default = (0, builder_1.Command)("ls [e]", { args: (a) => ({ e: a.emoji() }) }, async (context, args) => {
    console.log(args.e);
    const data = await (0, node_fetch_1.default)(args.e.url).then((x) => x.buffer());
    const i = await imagescript_1.Image.decode(data);
    let i2 = new imagescript_1.Image(250, 250);
    i2.composite(i, i2.width / 2 - i.width / 2, i2.height / 2 - i.height / 2);
    const u8 = await i2.encode();
    context.editOrReply({
        files: [{ value: Buffer.from(u8), filename: "test.png" }],
    });
});
