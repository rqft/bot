"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ansi = exports.Formatter = void 0;
function Formatter(data, use = (_, t) => t) {
    class Format {
        code;
        constructor(code = []) {
            this.code = code;
            for (const k in data) {
                Object.defineProperty(this, k, {
                    get() {
                        const t = Format.new([...this.code, data[k]]);
                        return t;
                    },
                });
            }
        }
        use(text) {
            return use(this.code, text);
        }
        static new(code = []) {
            return new Format(code);
        }
    }
    for (const k in data) {
        Object.defineProperty(Format, k, {
            get() {
                const t = Format.new([data[k]]);
                return t;
            },
        });
    }
    return Format;
}
exports.Formatter = Formatter;
var Ansi;
(function (Ansi) {
    Ansi.Identifier = '\u001b[';
    let FormattingCodes;
    (function (FormattingCodes) {
        FormattingCodes["Black"] = "30";
        FormattingCodes["Red"] = "31";
        FormattingCodes["Green"] = "32";
        FormattingCodes["Yellow"] = "33";
        FormattingCodes["Blue"] = "34";
        FormattingCodes["Magenta"] = "35";
        FormattingCodes["Cyan"] = "36";
        FormattingCodes["White"] = "37";
        FormattingCodes["BackgroundBlack"] = "40";
        FormattingCodes["BackgroundRed"] = "41";
        FormattingCodes["BackgroundGreen"] = "42";
        FormattingCodes["BackgroundYellow"] = "43";
        FormattingCodes["BackgroundBlue"] = "44";
        FormattingCodes["BackgroundMagenta"] = "45";
        FormattingCodes["BackgroundCyan"] = "46";
        FormattingCodes["BackgroundWhite"] = "47";
        FormattingCodes["BrightBlack"] = "30;1";
        FormattingCodes["BrightRed"] = "31;1";
        FormattingCodes["BrightGreen"] = "32;1";
        FormattingCodes["BrightYellow"] = "33;1";
        FormattingCodes["BrightBlue"] = "34;1";
        FormattingCodes["BrightMagenta"] = "35;1";
        FormattingCodes["BrightCyan"] = "36;1";
        FormattingCodes["BrightWhite"] = "37;1";
        FormattingCodes["BrightBackgroundBlack"] = "40;1";
        FormattingCodes["BrightBackgroundRed"] = "41;1";
        FormattingCodes["BrightBackgroundGreen"] = "42;1";
        FormattingCodes["BrightBackgroundYellow"] = "43;1";
        FormattingCodes["BrightBackgroundBlue"] = "44;1";
        FormattingCodes["BrightBackgroundMagenta"] = "45;1";
        FormattingCodes["BrightBackgroundCyan"] = "46;1";
        FormattingCodes["BrightBackgroundWhite"] = "47;1";
        FormattingCodes["Bold"] = "1";
        FormattingCodes["Underline"] = "4";
        FormattingCodes["Reversed"] = "7";
        FormattingCodes["Reset"] = "0";
    })(FormattingCodes = Ansi.FormattingCodes || (Ansi.FormattingCodes = {}));
    function use(codes, text) {
        return `${Ansi.Identifier}${FormattingCodes.Reset}m${codes
            .map((x) => Ansi.Identifier + x + 'm')
            .join('')}${text}${Ansi.Identifier}${FormattingCodes.Reset}m`;
    }
    Ansi.use = use;
    Ansi.Fmt = Formatter(FormattingCodes, use);
})(Ansi = exports.Ansi || (exports.Ansi = {}));
