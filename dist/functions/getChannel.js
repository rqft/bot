"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannel = void 0;
function getChannel(message, args, useJoin = false, argument = 0) {
    var res = (useJoin ? args.join(" ") : args[argument])?.normalize();
    if (!res)
        res = message.channel.id;
    if (res?.toLowerCase() == "here")
        res = message.channel.id;
    if (res?.toLowerCase() == "random") {
        if (!message.guild) {
            return null;
        }
        res = message.guild.channels.cache.random().id;
    }
    var unresolvedID = args.join(" ").length ? res : message.author.id;
    if (res.match(/<@!?(\d+)>/g)?.length !== 0)
        unresolvedID = res.replace(/[<@!>]/g, "");
    var channel = null;
    try {
        channel = message.guild?.channels.cache.find((e) => e.name.toLowerCase().normalize() == unresolvedID ||
            e.id == unresolvedID ||
            `${e}` == unresolvedID ||
            message.guild?.members.cache.get(e.id)?.nickname == unresolvedID);
    }
    catch (error) { }
    return channel;
}
exports.getChannel = getChannel;
