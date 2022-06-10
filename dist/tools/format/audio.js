"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Audio = void 0;
const pariah_1 = require("pariah");
const secrets_1 = require("../../secrets");
const tools_1 = require("../tools");
var Audio;
(function (Audio) {
    Audio.instance = new pariah_1.APIs.Jonathan.API(secrets_1.Secrets.ApiToken);
    async function volume(context, args) {
        const { payload: audio } = await Audio.instance.audioVolume(args.target, args.volume);
        return await (0, tools_1.editOrReply)(context, {
            files: [{ filename: "volume.mp3", value: audio }],
        });
    }
    Audio.volume = volume;
})(Audio = exports.Audio || (exports.Audio = {}));
