"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const __1 = require("..");
async function getUser(message, args, useJoin = false) {
    var res = (useJoin ? args.join(" ")?.normalize() : args[0]?.normalize()) ??
        message.author.id;
    if (res?.toLowerCase() == "discord")
        res = "643945264868098049";
    if (res?.toLowerCase() == "me" || res?.toLowerCase() == "self")
        res = message.author.id;
    if (res?.toLowerCase() == "bot" || res?.toLowerCase() == "system")
        res = __1.client.user?.id;
    if (res?.toLowerCase() == "random") {
        if (!message.guild) {
            return null;
        }
        res = message.guild.members.cache.random().id;
    }
    if (res?.toLowerCase() == "owner") {
        if (!message.guild) {
            return null;
        }
        res = message.guild.ownerID;
    }
    var unresolvedID = args.join(" ").length
        ? res.toLowerCase()
        : message.author.id;
    var user = null;
    try {
        user =
            __1.client.users.cache.find((u) => {
                return (unresolvedID == u.username.toLowerCase() ||
                    unresolvedID.replace(/\D/g, "") == u.id ||
                    unresolvedID == u.tag.toLowerCase());
            }) ?? (await __1.client.users.fetch(unresolvedID));
    }
    catch (error) { }
    return user;
}
exports.getUser = getUser;
