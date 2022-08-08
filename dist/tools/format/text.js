"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const fetch_1 = require("@rqft/fetch");
const tools_1 = require("../tools");
var Text;
(function (Text) {
    Text.instance = new fetch_1.APIs.Jonathan.API();
    function decideMethod(args) {
        const { method, decode } = args;
        if (method) {
            return method;
        }
        if (decode) {
            return fetch_1.APIs.Jonathan.ConversionMethods.DECODE;
        }
        return fetch_1.APIs.Jonathan.ConversionMethods.ENCODE;
    }
    Text.decideMethod = decideMethod;
    async function convert(context, args) {
        const { text, conversion } = args;
        const method = decideMethod(args);
        const { payload } = await Text.instance.textConvert(text, conversion, method, args);
        return await (0, tools_1.editOrReply)(context, payload.data);
    }
    Text.convert = convert;
})(Text = exports.Text || (exports.Text = {}));
