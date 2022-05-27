"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.image = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const markdown_1 = require("../markdown");
const tools_1 = require("../tools");
const basic_1 = require("./basic");
const embed_1 = require("./embed");
async function image(context, args) {
    const req = await (0, node_fetch_1.default)(args.target);
    const data = await req.buffer();
    const attachment = await (0, tools_1.store)(data, 'image.gif');
    const embed = embed_1.Embed.user(context);
    embed.setThumbnail(args.target);
    {
        const description = [];
        description.push(basic_1.Basic.field("<:IconGui_RichPresence:798624241351655514>", "Attachment ID", markdown_1.Markdown.Format.codestring(attachment.id)));
        description.push(basic_1.Basic.field("<:IconChannel_Category:798624247122493450>", "Class Type", markdown_1.Markdown.Format.codestring(attachment.classType)));
        if (attachment.mimetype) {
            description.push(basic_1.Basic.field("<:blank:835277151031787541>", "-> Mime Type", markdown_1.Markdown.Format.codestring(attachment.mimetype)));
        }
        if (attachment.contentType) {
            description.push(basic_1.Basic.field("<:blank:835277151031787541>", "-> Content-Type", markdown_1.Markdown.Format.codestring(attachment.contentType)));
        }
        if (attachment.size) {
            description.push(basic_1.Basic.field("<:IconGui_NameEdited:836702490413629490>", "Size", markdown_1.Markdown.Format.codestring(`${attachment.width}x${attachment.height}`)));
            description.push(basic_1.Basic.field("<:blank:835277151031787541>", "-> File Size", markdown_1.Markdown.Format.codestring((0, tools_1.formatBytes)(attachment.size))));
            if (description.length) {
                embed.addField("Attachment Info", description.join("\n"), true);
            }
        }
    }
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.image = image;
