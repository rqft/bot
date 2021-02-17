"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRole = void 0;
function getRole(message, args, useJoin = false, argument = 0) {
    if (!message.guild)
        return null;
    var unresolvedID = (useJoin
        ? args.join(" ").toLowerCase()
        : args[argument]?.toLowerCase()).length
        ? args.join(" ").toLowerCase()
        : message.member?.roles.highest.id;
    var role = null;
    try {
        role = message.guild.roles.cache.find((e) => e.name.toLowerCase().startsWith(unresolvedID) ||
            e.id == unresolvedID ||
            `${e}` == unresolvedID);
    }
    catch (error) { }
    return role;
}
exports.getRole = getRole;
