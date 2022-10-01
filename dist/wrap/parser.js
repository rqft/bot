"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelConstructors = exports.ChannelNames = void 0;
const structures_1 = require("detritus-client/lib/structures");
var ChannelNames;
(function (ChannelNames) {
    ChannelNames["Base"] = "Base";
    ChannelNames["Dm"] = "Dm";
    ChannelNames["GuildVoice"] = "GuildVoice";
    ChannelNames["DmGroup"] = "DmGroup";
    ChannelNames["GuildBase"] = "GuildBase";
    ChannelNames["GuildCategory"] = "GuildCategory";
    ChannelNames["GuildText"] = "GuildText";
    ChannelNames["GuildStore"] = "GuildStore";
    ChannelNames["GuildThread"] = "GuildThread";
    ChannelNames["GuildStageVoice"] = "GuildStageVoice";
    ChannelNames["GuildDirectory"] = "GuildDirectory";
    ChannelNames["GuildForum"] = "GuildForum";
})(ChannelNames = exports.ChannelNames || (exports.ChannelNames = {}));
exports.ChannelConstructors = {
    [ChannelNames.Base]: structures_1.ChannelBase,
    [ChannelNames.Dm]: structures_1.ChannelDM,
    [ChannelNames.DmGroup]: structures_1.ChannelDMGroup,
    [ChannelNames.GuildBase]: structures_1.ChannelGuildBase,
    [ChannelNames.GuildCategory]: structures_1.ChannelGuildCategory,
    [ChannelNames.GuildDirectory]: structures_1.ChannelGuildDirectory,
    [ChannelNames.GuildForum]: structures_1.ChannelGuildForum,
    [ChannelNames.GuildStageVoice]: structures_1.ChannelGuildStageVoice,
    [ChannelNames.GuildStore]: structures_1.ChannelGuildStore,
    [ChannelNames.GuildText]: structures_1.ChannelGuildText,
    [ChannelNames.GuildThread]: structures_1.ChannelGuildThread,
    [ChannelNames.GuildVoice]: structures_1.ChannelGuildVoice,
};
