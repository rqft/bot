"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const imagescript_eval_1 = require("../functions/imagescript_eval");
const pullCodeFromBlock_1 = require("../functions/pullCodeFromBlock");
module.exports = {
    name: "latex",
    aliases: ["tex"],
    description: "render LaTeX code",
    usage: "<code: string>",
    async run(message, args) {
        const query = pullCodeFromBlock_1.pullCodeFromBlock(args.join(" "));
        const options = {
            formula: query,
            fsize: "48px",
            color: "000000",
            mode: 0,
            out: 1,
            errors: 1,
            remhost: "quicklatex.com",
            preamble: "\\usepackage{amsmath}\n\\usepackage{amsfonts}\n\\usepackage{amssymb}",
            rnd: Math.random() * 100,
        };
        const res = await node_fetch_1.default("https://quicklatex.com/latex3.f", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: Object.entries(options)
                .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
                .join("&"),
        });
        if (!res.ok)
            return message.channel.send(`An error occurred: \`\`\`\n${await res.text()}\`\`\``);
        const resTxt = await res.text();
        if (parseInt(resTxt.split("\n")[0]) < 0)
            return await message.channel.send(`${resTxt.split("\n").slice(2, Infinity).join("\n")}`, { code: "txt" });
        const url = resTxt.split("\n")[1].split(/\s/)[0];
        const [ok, isres] = await imagescript_eval_1.is_eval(`
    const formula = Image.load(url);
    const background = Image.new(formula.width + 64, formula.height + 64, 0xffffffff);
    background.composite(formula, 32, 32);
    image = background
    `, { url });
        if (!ok)
            return message.channel.send(isres);
        await message.channel.send(``, {
            files: [
                {
                    name: "latex.png",
                    attachment: isres,
                },
            ],
        });
    },
};
