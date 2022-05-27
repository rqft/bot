"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.image = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const markdown_1 = require("../markdown");
const tools_1 = require("../tools");
const Basic = __importStar(require("./basic"));
const Embed = __importStar(require("./embed"));
async function image(context, args) {
    const req = await (0, node_fetch_1.default)(args.target);
    const data = await req.buffer();
    const attachment = await (0, tools_1.store)(data, 'image.gif');
    const embed = Embed.user(context);
    embed.setThumbnail(args.target);
    {
        const description = [];
        description.push(Basic.field("<:IconGui_RichPresence:798624241351655514>", "Attachment ID", markdown_1.Markdown.Format.codestring(attachment.id)));
        description.push(Basic.field("<:IconChannel_Category:798624247122493450>", "Class Type", markdown_1.Markdown.Format.codestring(attachment.classType)));
        if (attachment.mimetype) {
            description.push(Basic.field("<:blank:835277151031787541>", "-> Mime Type", markdown_1.Markdown.Format.codestring(attachment.mimetype)));
        }
        if (attachment.contentType) {
            description.push(Basic.field("<:blank:835277151031787541>", "-> Content-Type", markdown_1.Markdown.Format.codestring(attachment.contentType)));
        }
        if (attachment.size) {
            description.push(Basic.field("<:IconGui_NameEdited:836702490413629490>", "Size", markdown_1.Markdown.Format.codestring(`${attachment.width}x${attachment.height}`)));
            description.push(Basic.field("<:blank:835277151031787541>", "-> File Size", markdown_1.Markdown.Format.codestring((0, tools_1.formatBytes)(attachment.size))));
            if (description.length) {
                embed.addField("Attachment Info", description.join("\n"), true);
            }
        }
    }
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.image = image;
