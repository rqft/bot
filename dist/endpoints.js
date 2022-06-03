"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VyboseEndpoints = void 0;
var VyboseEndpoints;
(function (VyboseEndpoints) {
    VyboseEndpoints.CUSTOM = {
        STEAM_EMOJI: (name) => `https://steamcommunity-a.akamaihd.net/economy/emoticon/${name}`,
        TWEMOJI_SVG: (codepoint) => `https://cdn.notsobot.com/twemoji/512x512/${codepoint}.png`,
    };
})(VyboseEndpoints = exports.VyboseEndpoints || (exports.VyboseEndpoints = {}));
