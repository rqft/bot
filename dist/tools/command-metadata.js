"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunMetadata = exports.ToolsMetadata = exports.ImageMetadata = exports.Metadata = exports.CommandType = void 0;
var CommandType;
(function (CommandType) {
    CommandType["IMAGE"] = "image";
    CommandType["TOOLS"] = "tools";
    CommandType["FUN"] = "fun";
})(CommandType = exports.CommandType || (exports.CommandType = {}));
function Metadata(type, description, usage = "", examples = []) {
    return {
        category: type,
        description,
        examples,
        usage,
    };
}
exports.Metadata = Metadata;
function ImageMetadata(description, usage = "", examples = [
    "insyri",
    "insyri#7314",
    "533757461706964993",
    "https://cdn.clancy.lol/turkey.png",
]) {
    return Metadata(CommandType.IMAGE, description, usage, examples);
}
exports.ImageMetadata = ImageMetadata;
function ToolsMetadata(description, usage = "", examples = []) {
    return Metadata(CommandType.TOOLS, description, usage, examples);
}
exports.ToolsMetadata = ToolsMetadata;
function FunMetadata(description, usage = "", examples = []) {
    return Metadata(CommandType.FUN, description, usage, examples);
}
exports.FunMetadata = FunMetadata;
