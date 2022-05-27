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
Object.defineProperty(exports, "__esModule", { value: true });
exports.guild = void 0;
const tools_1 = require("../tools");
const Embed = __importStar(require("./embed"));
async function guild(context) {
    const { guild } = context;
    if (!guild) {
        throw new Error('Need to be in a guild');
    }
    const embed = Embed.user(context);
    {
        embed.setTitle(guild.name);
        if (guild.iconUrl) {
            embed.setThumbnail(guild.iconUrl);
        }
        if (guild.bannerUrl) {
            embed.setImage(guild.bannerUrl);
        }
        if (guild.description) {
            embed.setDescription(guild.description);
        }
    }
    {
    }
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.guild = guild;
