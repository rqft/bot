"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Markdown = void 0;
var Markdown;
(function (Markdown) {
    let TimestampStyles;
    (function (TimestampStyles) {
        TimestampStyles["BOTH_LONG"] = "F";
        TimestampStyles["BOTH_SHORT"] = "f";
        TimestampStyles["DATE_LONG"] = "D";
        TimestampStyles["DATE_SHORT"] = "d";
        TimestampStyles["RELATIVE"] = "R";
        TimestampStyles["TIME_LONG"] = "T";
        TimestampStyles["TIME_SHORT"] = "t";
    })(TimestampStyles = Markdown.TimestampStyles || (Markdown.TimestampStyles = {}));
    function trueSlice(text, limit) {
        if (limit) {
            return new TextDecoder().decode(new TextEncoder().encode(text).slice(0, limit));
        }
        return text;
    }
    Markdown.trueSlice = trueSlice;
    Markdown.Strings = {
        BOLD: "**",
        CODEBLOCK: "```",
        CODESTRING: "`",
        CODESTRING_DOUBLE: "``",
        ESCAPE: "\\",
        ITALICS: "_",
        SPOILER: "||",
        STRIKE: "~~",
        UNDERLINE: "__",
    };
    const Regexes = {
        [Markdown.Strings.BOLD]: /\*\*/g,
        [Markdown.Strings.CODEBLOCK]: new RegExp(Markdown.Strings.CODEBLOCK, "g"),
        [Markdown.Strings.CODESTRING]: new RegExp(Markdown.Strings.CODESTRING, "g"),
        [Markdown.Strings.ESCAPE]: /\\/g,
        [Markdown.Strings.ITALICS]: /(_|\*)/g,
        [Markdown.Strings.SPOILER]: /\|\|/g,
        [Markdown.Strings.STRIKE]: new RegExp(Markdown.Strings.STRIKE, "g"),
        [Markdown.Strings.UNDERLINE]: new RegExp(Markdown.Strings.UNDERLINE, "g"),
        EVERYONE: /@(everyone|here)/g,
        LINK: /\]\(/g,
        MENTION: /<@([!&]?[0-9]{16,21})>/g,
        MENTION_HARDCORE: /@/g,
        URL: /\)/g,
    };
    const Replacements = {
        [Markdown.Strings.BOLD]: "\\*\\*",
        [Markdown.Strings.CODEBLOCK]: "``\u200b`",
        [Markdown.Strings.CODESTRING]: "\\`",
        [Markdown.Strings.ESCAPE]: "\\\\",
        [Markdown.Strings.ITALICS]: "\\$1",
        [Markdown.Strings.SPOILER]: "\\|\\|",
        [Markdown.Strings.STRIKE]: "\\~\\~",
        [Markdown.Strings.UNDERLINE]: "\\_\\_",
        MENTION: "\u200b",
    };
    function EscapeBasic(raw, key) {
        return raw.replace(Regexes[key], Replacements[key]);
    }
    Markdown.EscapeBasic = EscapeBasic;
    Markdown.Escape = Object.keys(Markdown.Strings).reduce((p, v) => Object.assign(p, { [v]: (raw) => EscapeBasic(raw, v) }), {});
    const FrozenTimestampStyles = {
        [TimestampStyles.BOTH_LONG]: "{day}, {month} {date}, {year} {hour}:{minute} {meridian}",
        [TimestampStyles.BOTH_SHORT]: "{month} {date}, {year} {hour}:{minute} {meridian}",
        [TimestampStyles.DATE_LONG]: "{month} {date}, {year}",
        [TimestampStyles.DATE_SHORT]: "{month_short}/{date}/{year}",
        [TimestampStyles.RELATIVE]: "{relative}",
        [TimestampStyles.TIME_LONG]: "{hour}:{minute}:{second} {meridian}",
        [TimestampStyles.TIME_SHORT]: "{hour}:{minute} {meridian}",
    };
    const Days = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
    };
    const Months = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December",
    };
    function formatDate(date) {
        return {
            relative: toTimeString(date.getTime(), TimestampUnits),
            raw: date.getTime(),
            date: date.getDate().toString().padStart(2, "0"),
            day: Days[date.getDay()],
            hour: date.getHours().toString().padStart(2, "0"),
            meridian: date.getHours() > 12 ? "PM" : "AM",
            minute: date.getMinutes().toString().padStart(2, "0"),
            month: Months[date.getMonth()],
            month_short: (date.getMonth() + 1).toString().padStart(2, "0"),
            second: date.getSeconds().toString().padStart(2, "0"),
            year: date.getFullYear().toString(),
        };
    }
    Markdown.formatDate = formatDate;
    function multiplyLarge(...nums) {
        return nums.map(BigInt).reduce((p, v) => (p *= v), 1n);
    }
    Markdown.multiplyLarge = multiplyLarge;
    function bigintAbs(int) {
        if (int < 0)
            return -int;
        return int;
    }
    Markdown.bigintAbs = bigintAbs;
    const TimestampUnits = {
        myriad: multiplyLarge(10, 10, 10, 10, 12, 4, 7, 24, 60, 1000),
        millenium: multiplyLarge(10, 10, 10, 12, 4, 7, 24, 60, 1000),
        century: multiplyLarge(10, 10, 12, 4, 7, 24, 60, 1000),
        decade: multiplyLarge(10, 12, 4, 7, 24, 60, 60, 1000),
        year: multiplyLarge(12, 4, 7, 24, 60, 60, 1000),
        month: multiplyLarge(4, 7, 24, 60, 60, 1000),
        week: multiplyLarge(7, 24, 60, 60, 1000),
        day: multiplyLarge(24, 60, 60, 1000),
        hour: multiplyLarge(60, 60, 1000),
        minute: multiplyLarge(60, 1000),
        second: multiplyLarge(1000),
        millisecond: multiplyLarge(1),
    };
    function toTimeString(unix, units = TimestampUnits, isFromNow = false, limit) {
        if (typeof unix === "number")
            unix = BigInt(unix);
        if (isFromNow)
            unix = bigintAbs(unix - BigInt(Date.now()));
        if (unix === 0n)
            return "0 milliseconds";
        const formatted = new Map();
        const unitList = Object.entries(units);
        let run = unix;
        for (const [unit, value] of unitList) {
            if (run < value)
                continue;
            const runs = run / value + 1n;
            for (let loop = 0; loop <= runs; loop++) {
                if (run < value)
                    break;
                const item = formatted.get(unit);
                if (item)
                    formatted.set(unit, item + 1);
                else
                    formatted.set(unit, 1);
                run -= value;
            }
        }
        let returned = [];
        for (const [key, value] of formatted) {
            const unit = String(key) + (value === 1 ? "" : "s");
            returned.push(`${value} ${unit}`);
        }
        if (limit !== undefined) {
            returned = returned.slice(0, limit);
        }
        return returned.join(", ");
    }
    Markdown.toTimeString = toTimeString;
    function freezeUnix(unix, style) {
        const date = new Date(unix);
        const timestamp = formatDate(date);
        let ret = FrozenTimestampStyles[style];
        for (const [key, value] of Object.entries(timestamp)) {
            ret = ret.split(`{${key}}`).join(value);
        }
        return ret;
    }
    Markdown.freezeUnix = freezeUnix;
    class FormatInner {
        raw;
        static = FormatInner;
        constructor(raw) {
            if (raw instanceof FormatInner) {
                raw = raw.raw;
            }
            this.raw = raw;
        }
        toString() {
            return this.raw;
        }
        valueOf() {
            return this.raw;
        }
        italics() {
            return this.build("ITALICS", this.raw);
        }
        bold() {
            return this.build("BOLD", this.raw);
        }
        codestring() {
            const useDouble = this.raw.includes(Markdown.Strings.CODESTRING);
            if (useDouble) {
                return this.codestringDouble();
            }
            return this.codestringSingle();
        }
        codestringDouble() {
            return this.build("CODESTRING_DOUBLE", this.raw);
        }
        codestringSingle() {
            return this.build("CODESTRING", this.raw);
        }
        codeblock(language) {
            let full = "";
            if (language) {
                full += language + "\n";
            }
            full += this.raw;
            return this.build("CODEBLOCK", full);
        }
        spoiler() {
            return this.build("SPOILER", this.raw);
        }
        strike() {
            return this.build("STRIKE", this.raw);
        }
        underline() {
            return this.build("UNDERLINE", this.raw);
        }
        build(key, w) {
            const escaped = Markdown.Escape[key](w, key);
            const ret = this.static.wrap(escaped, Markdown.Strings[key]);
            return new this.static(ret);
        }
        static wrap(raw, what) {
            return `${what}${raw}${what}`;
        }
        [Symbol.toStringTag]() {
            return this.toString();
        }
    }
    class Format extends FormatInner {
        static bold(text) {
            return new this(text).bold();
        }
        static build(text, key) {
            return new this(text).build(key, text);
        }
        static codeblock(text, language) {
            return new this(text).codeblock(language);
        }
        static codestring(text) {
            return new this(text).codestring();
        }
        static codestringSingle(text) {
            return new this(text).codestringSingle();
        }
        static codestringDouble(text) {
            return new this(text).codestringDouble();
        }
        static italics(text) {
            return new this(text).italics();
        }
        static spoiler(text) {
            return new this(text).spoiler();
        }
        static strike(text) {
            return new this(text).strike();
        }
        static underline(text) {
            return new this(text).underline();
        }
        static timestamp(unix, format = TimestampStyles.BOTH_SHORT, isSeconds = false) {
            if (typeof unix === "string")
                unix = Number(unix);
            if (unix instanceof Date)
                unix = unix.getTime();
            if (!isSeconds) {
                unix /= 1000;
            }
            unix = Math.floor(unix);
            return new this(`<t:${unix}:${format}>`);
        }
        static date(unix, format = TimestampStyles.BOTH_SHORT, isSeconds = false) {
            if (typeof unix === "string")
                unix = Number(unix);
            if (unix instanceof Date)
                unix = unix.getTime();
            if (isSeconds) {
                unix *= 1000;
            }
            return new this(freezeUnix(unix, format));
        }
        static link(text, url) {
            if (url instanceof URL)
                url = url.href;
            return new this(`[${text}](${url})`);
        }
    }
    Markdown.Format = Format;
    let DiscordRegexNames;
    (function (DiscordRegexNames) {
        DiscordRegexNames["EMOJI"] = "EMOJI";
        DiscordRegexNames["JUMP_CHANNEL"] = "JUMP_CHANNEL";
        DiscordRegexNames["JUMP_CHANNEL_MESSAGE"] = "JUMP_CHANNEL_MESSAGE";
        DiscordRegexNames["MENTION_CHANNEL"] = "MENTION_CHANNEL";
        DiscordRegexNames["MENTION_ROLE"] = "MENTION_ROLE";
        DiscordRegexNames["MENTION_USER"] = "MENTION_USER";
        DiscordRegexNames["TEXT_BOLD"] = "TEXT_BOLD";
        DiscordRegexNames["TEXT_CODEBLOCK"] = "TEXT_CODEBLOCK";
        DiscordRegexNames["TEXT_CODESTRING"] = "TEXT_CODESTRING";
        DiscordRegexNames["TEXT_ITALICS"] = "TEXT_ITALICS";
        DiscordRegexNames["TEXT_SNOWFLAKE"] = "TEXT_SNOWFLAKE";
        DiscordRegexNames["TEXT_SPOILER"] = "TEXT_SPOILER";
        DiscordRegexNames["TEXT_STRIKE"] = "TEXT_STRIKE";
        DiscordRegexNames["TEXT_UNDERLINE"] = "TEXT_UNDERLINE";
        DiscordRegexNames["TEXT_URL"] = "TEXT_URL";
    })(DiscordRegexNames = Markdown.DiscordRegexNames || (Markdown.DiscordRegexNames = {}));
    Markdown.DiscordRegex = {
        [DiscordRegexNames.EMOJI]: /<a?:(\w+):(\d+)>/g,
        [DiscordRegexNames.JUMP_CHANNEL]: /^(?:https?):\/\/(?:(?:(?:canary|ptb)\.)?(?:discord|discordapp)\.com\/channels\/)(@me|\d+)\/(\d+)$/g,
        [DiscordRegexNames.JUMP_CHANNEL_MESSAGE]: /^(?:https?):\/\/(?:(?:(?:canary|ptb)\.)?(?:discord|discordapp)\.com\/channels\/)(@me|\d+)\/(\d+)\/(\d+)$/g,
        [DiscordRegexNames.MENTION_CHANNEL]: /<#(\d+)>/g,
        [DiscordRegexNames.MENTION_ROLE]: /<@&(\d+)>/g,
        [DiscordRegexNames.MENTION_USER]: /<@(!?)(\d+)>/g,
        [DiscordRegexNames.TEXT_BOLD]: /\*\*([\s\S]+?)\*\*/g,
        [DiscordRegexNames.TEXT_CODEBLOCK]: /```(([a-z0-9-]+?)\n+)?\n*([^]+?)\n*```/gi,
        [DiscordRegexNames.TEXT_CODESTRING]: /`([\s\S]+?)`/g,
        [DiscordRegexNames.TEXT_ITALICS]: /_([\s\S]+?)_|\*([\s\S]+?)\*/g,
        [DiscordRegexNames.TEXT_SNOWFLAKE]: /(\d+)/g,
        [DiscordRegexNames.TEXT_SPOILER]: /\|\|([\s\S]+?)\|\|/g,
        [DiscordRegexNames.TEXT_STRIKE]: /~~([\s\S]+?)~~(?!_)/g,
        [DiscordRegexNames.TEXT_UNDERLINE]: /__([\s\S]+?)__/g,
        [DiscordRegexNames.TEXT_URL]: /((?:https?):\/\/[^\s<]+[^<.,:;"'\]\s])/g,
    };
    class MatchInner {
        raw;
        static = MatchInner;
        constructor(raw) {
            this.raw = raw;
        }
        emoji() {
            return this.match(DiscordRegexNames.EMOJI);
        }
        jumpChannel() {
            return this.match(DiscordRegexNames.JUMP_CHANNEL);
        }
        jumpChannelMessage() {
            return this.match(DiscordRegexNames.JUMP_CHANNEL_MESSAGE);
        }
        mentionChannel() {
            return this.match(DiscordRegexNames.MENTION_CHANNEL);
        }
        mentionRole() {
            return this.match(DiscordRegexNames.MENTION_ROLE);
        }
        mentionUser() {
            return this.match(DiscordRegexNames.MENTION_USER);
        }
        codeblock() {
            return this.match(DiscordRegexNames.TEXT_CODEBLOCK);
        }
        bold() {
            return this.match(DiscordRegexNames.TEXT_BOLD);
        }
        codestring() {
            return this.match(DiscordRegexNames.TEXT_CODESTRING);
        }
        italics() {
            return this.match(DiscordRegexNames.TEXT_ITALICS);
        }
        snowflake() {
            return this.match(DiscordRegexNames.TEXT_SNOWFLAKE);
        }
        spoiler() {
            return this.match(DiscordRegexNames.TEXT_SPOILER);
        }
        strike() {
            return this.match(DiscordRegexNames.TEXT_STRIKE);
        }
        underline() {
            return this.match(DiscordRegexNames.TEXT_UNDERLINE);
        }
        url() {
            return this.match(DiscordRegexNames.TEXT_URL);
        }
        match(type, onlyFirst = false) {
            const regex = Markdown.DiscordRegex[type];
            if (regex === undefined) {
                throw new global.Error(`Unknown regex type: ${type}`);
            }
            regex.lastIndex = 0;
            const payload = {
                match: { regex, type },
                matches: [],
            };
            let match = null;
            while ((match = regex.exec(this.raw))) {
                const result = { matched: match[0], species: type };
                switch (type) {
                    case DiscordRegexNames.EMOJI:
                        {
                            result.name = match[1];
                            result.id = match[2];
                            result.animated = this.raw.startsWith("<a:");
                        }
                        break;
                    case DiscordRegexNames.JUMP_CHANNEL:
                        {
                            result.guildId = match[1];
                            result.channelId = match[2];
                        }
                        break;
                    case DiscordRegexNames.JUMP_CHANNEL_MESSAGE:
                        {
                            result.guildId = match[1];
                            result.channelId = match[2];
                            result.messageId = match[3];
                        }
                        break;
                    case DiscordRegexNames.MENTION_CHANNEL:
                    case DiscordRegexNames.MENTION_ROLE:
                        {
                            result.id = match[1];
                        }
                        break;
                    case DiscordRegexNames.MENTION_USER:
                        {
                            result.id = match[2];
                            result.mentionType = match[1];
                        }
                        break;
                    case DiscordRegexNames.TEXT_CODEBLOCK:
                        {
                            result.language = match[2];
                            result.text = match[3];
                        }
                        break;
                    case DiscordRegexNames.TEXT_BOLD:
                    case DiscordRegexNames.TEXT_CODESTRING:
                    case DiscordRegexNames.TEXT_ITALICS:
                    case DiscordRegexNames.TEXT_SNOWFLAKE:
                    case DiscordRegexNames.TEXT_SPOILER:
                    case DiscordRegexNames.TEXT_STRIKE:
                    case DiscordRegexNames.TEXT_UNDERLINE:
                    case DiscordRegexNames.TEXT_URL:
                        {
                            result.text = match[1];
                        }
                        break;
                    default: {
                        throw new global.Error(`Unknown regex type: ${type}`);
                    }
                }
                payload.matches.push(result);
                if (onlyFirst) {
                    break;
                }
            }
            regex.lastIndex = 0;
            return payload;
        }
    }
    class Match extends MatchInner {
        static bold(raw) {
            return new this(raw).bold();
        }
        static codeblock(raw) {
            return new this(raw).codeblock();
        }
        static codestring(raw) {
            return new this(raw).codestring();
        }
        static emoji(raw) {
            return new this(raw).emoji();
        }
        static italics(raw) {
            return new this(raw).italics();
        }
        static jumpChannel(raw) {
            return new this(raw).jumpChannel();
        }
        static jumpChannelMessage(raw) {
            return new this(raw).jumpChannelMessage();
        }
        static match(raw, what, onlyFirst = false) {
            return new this(raw).match(what, onlyFirst);
        }
        static mentionChannel(raw) {
            return new this(raw).mentionChannel();
        }
        static mentionRole(raw) {
            return new this(raw).mentionRole();
        }
        static mentionUser(raw) {
            return new this(raw).mentionUser();
        }
        static snowflake(raw) {
            return new this(raw).snowflake();
        }
        static spoiler(raw) {
            return new this(raw).spoiler();
        }
        static strike(raw) {
            return new this(raw).strike();
        }
        static underline(raw) {
            return new this(raw).underline();
        }
        static url(raw) {
            return new this(raw).url();
        }
    }
    Markdown.Match = Match;
})(Markdown = exports.Markdown || (exports.Markdown = {}));
