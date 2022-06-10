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
        console.log(args);
        const { payload: audio } = await Audio.instance.audioVolume(args.target, args.volume);
        return await (0, tools_1.editOrReply)(context, {
            content: `Volume: ${args.volume}`,
            files: [{ filename: "volume.mp3", value: audio }],
        });
    }
    Audio.volume = volume;
    async function pitch(context, args) {
        const { payload: audio } = await Audio.instance.audioPitch(args.target, args.pitch);
        return await (0, tools_1.editOrReply)(context, {
            content: `Pitch: ${args.pitch}`,
            files: [{ filename: "pitch.mp3", value: audio }],
        });
    }
    Audio.pitch = pitch;
    async function extract(context, args) {
        const { payload: audio } = await Audio.instance.audioExtract(args.target);
        return await (0, tools_1.editOrReply)(context, {
            files: [{ filename: "extract.mp3", value: audio }],
        });
    }
    Audio.extract = extract;
})(Audio = exports.Audio || (exports.Audio = {}));
