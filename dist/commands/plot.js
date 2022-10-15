"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const embed_1 = require("../tools/embed");
const fetch_1 = require("../tools/fetch");
const util_1 = require("../tools/util");
const warning_1 = require("../tools/warning");
const builder_1 = require("../wrap/builder");
exports.default = (0, builder_1.Command)("plot [expressions] [-s?=3] [-scale?=50] [-size?=1024]", {
    args: (self) => ({
        expressions: self.string(),
        s: self.integerOptional(),
        scale: self.integerOptional(),
        size: self.integerOptional(),
    }),
}, async (context, args) => {
    const { payload } = await fetch_1.Instances.self.graph(args.expressions, {
        splot: args.s,
        scale: args.scale,
        size: args.size,
    });
    const txt = new TextDecoder().decode(payload);
    let j = null;
    try {
        j = JSON.parse(txt);
    }
    catch {
        void 0;
    }
    if (j !== null) {
        throw new warning_1.Warning(j.status.message);
    }
    const embed = embed_1.Embeds.user(context);
    embed.setImage("attachment://plot.png");
    embed.setDescription((0, util_1.fmt)("Scale: {scale}", args));
    embed.setFooter((0, util_1.fmt)("{size}x{size}, Graph of f(x) = {expressions}", {
        size: args.size,
        expressions: args.expressions.split(";").join(" # "),
    }));
    return await (0, util_1.respond)(context, {
        embeds: [embed],
        files: [{ filename: "plot.png", value: payload }],
    });
});
