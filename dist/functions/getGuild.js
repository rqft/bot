"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuild = void 0;
const __1 = require("..");
async function getGuild(message, args, useJoin = false) {
    var res = useJoin
        ? args.join(" ")?.normalize()
        : args[0]?.normalize() ?? (message.guild ? "here" : "0");
    if (!res.length && !message.guild)
        return null;
    if (res == "here" && message.guild)
        res = message.guild.id;
    if (res?.toLowerCase() == "random")
        res = __1.client.guilds.cache.random().id;
    var unresolvedID = res.length ? res.toLowerCase() : message.guild.id;
    if (!unresolvedID)
        return;
    var guild = null;
    try {
        guild =
            __1.client.guilds.cache.find((u) => {
                return (u.name.toLowerCase().includes(unresolvedID) ||
                    unresolvedID.replace(/\D/g, "") == u.id ||
                    (!!u.vanityURLCode && unresolvedID == u.vanityURLCode.toLowerCase()));
            }) ?? (await __1.client.guilds.fetch(unresolvedID));
    }
    catch (error) { }
    return guild;
}
exports.getGuild = getGuild;
