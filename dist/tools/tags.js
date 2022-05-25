"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tags = void 0;
const error_1 = require("./error");
const parameters_1 = require("./parameters");
var Tags;
(function (Tags) {
    Tags.Symbols = {
        START: "(",
        END: ")",
        IGNORE: "\\",
        ARGUMENT: ",",
        FUNCTION: ":",
    };
    let Limits;
    (function (Limits) {
        Limits[Limits["ITERATIONS"] = 150] = "ITERATIONS";
        Limits[Limits["NETWORK_REQUESTS"] = 10] = "NETWORK_REQUESTS";
        Limits[Limits["REGEX_TIME"] = 25] = "REGEX_TIME";
        Limits[Limits["REPEAT_AMOUNT"] = 4000] = "REPEAT_AMOUNT";
        Limits[Limits["STRING_LENGTH"] = 10000] = "STRING_LENGTH";
        Limits[Limits["VARIABLE_KEY_LENGTH"] = 64] = "VARIABLE_KEY_LENGTH";
        Limits[Limits["VARIABLE_LENGTH"] = 4000] = "VARIABLE_LENGTH";
        Limits[Limits["VARIABLES"] = 100] = "VARIABLES";
    })(Limits = Tags.Limits || (Tags.Limits = {}));
    Tags.PRIVATE_VARIABLE_PREFIX = "__";
    Tags.SCRIPT_REGEX = new RegExp(`\\${Tags.Symbols.START}((?:(?!\\${Tags.Symbols.FUNCTION})(?:.|\s))*)${Tags.Symbols.FUNCTION}([\\s\\S]+)\\${Tags.Symbols.START}`);
    Tags.REGEX_ARGUMENT_SPLITTER = new RegExp(`(?!\\\\)[${Tags.Symbols.ARGUMENT}]`, "g");
    Tags.REGEX_ARGUMENT_SPLITTER_ESCAPE_REPLACEMENT = new RegExp(`\\\\\\${Tags.Symbols.ARGUMENT}`, "g");
    let Private;
    (function (Private) {
        Private["FILE_SIZE"] = "__fileSize";
        Private["ITERATIONS_REMAINING"] = "__iterationsRemaining";
        Private["NETWORK_REQUESTS"] = "__networkRequests";
    })(Private = Tags.Private || (Tags.Private = {}));
    let Helpers;
    (function (Helpers) {
        function constant(value) {
            return function (_, __, ___, ____, tag) {
                tag.text += value;
                return true;
            };
        }
        Helpers.constant = constant;
        function call(callback, reviver) {
            return function (_, __, passed, ___, tag) {
                const value = callback(...passed.map(reviver));
                tag.text += value;
                return true;
            };
        }
        Helpers.call = call;
        function user(property) {
            return async function (context, arg, __, ___, tag) {
                tag.variables[Private.NETWORK_REQUESTS]++;
                const user = (await parameters_1.Parameters.user(arg || context.user.id, context));
                let value = user[property];
                if (typeof value === "function") {
                    return false;
                }
                tag.text += value;
                return true;
            };
        }
        Helpers.user = user;
        function channel(property) {
            return async function (context, arg, __, ___, tag) {
                tag.variables[Private.NETWORK_REQUESTS]++;
                const channel = parameters_1.Parameters.channel()(arg, context) || context.channel;
                if (!channel) {
                    return false;
                }
                let value = channel[property];
                if (typeof value === "function") {
                    return false;
                }
                tag.text += value;
                return true;
            };
        }
        Helpers.channel = channel;
        function guild(property) {
            return async function (context, _, __, ___, tag) {
                tag.variables[Private.NETWORK_REQUESTS]++;
                const guild = context.guild;
                if (!guild) {
                    return false;
                }
                let value = guild[property];
                if (typeof value === "function") {
                    return false;
                }
                tag.text += value;
                return true;
            };
        }
        Helpers.guild = guild;
        function math(property) {
            const value = Math[property];
            if (typeof value !== "function") {
                return constant(value);
            }
            return call(value, Number);
        }
        Helpers.math = math;
        let IfComparison;
        (function (IfComparison) {
            IfComparison["EQUAL"] = "=";
            IfComparison["GREATER_THAN"] = ">";
            IfComparison["GREATER_THAN_OR_EQUAL"] = ">=";
            IfComparison["LESS_THAN"] = "<";
            IfComparison["LESS_THAN_OR_EQUAL"] = "<=";
            IfComparison["NOT_EQUAL"] = "!=";
        })(IfComparison = Helpers.IfComparison || (Helpers.IfComparison = {}));
    })(Helpers = Tags.Helpers || (Tags.Helpers = {}));
    let Keys;
    (function (Keys) {
        Keys["TEST"] = "TEST";
        Keys["USER_ID"] = "USER_ID";
        Keys["USER_NAME"] = "USER_NAME";
        Keys["USER_DISCRIMINATOR"] = "USER_DISCRIMINATOR";
        Keys["USER_AVATAR"] = "USER_AVATAR";
        Keys["USER_MENTION"] = "USER_MENTION";
        Keys["USER_TAG"] = "USER_TAG";
        Keys["CHANNEL_ID"] = "CHANNEL_ID";
        Keys["CHANNEL_NAME"] = "CHANNEL_NAME";
        Keys["CHANNEL_MENTION"] = "CHANNEL_MENTION";
        Keys["CHANNEL_TYPE"] = "CHANNEL_TYPE";
        Keys["CHANNEL_NSFW"] = "CHANNEL_NSFW";
        Keys["CHANNEL_BITRATE"] = "CHANNEL_BITRATE";
        Keys["CHANNEL_USER_COUNT"] = "CHANNEL_USER_COUNT";
        Keys["GUILD_ID"] = "GUILD_ID";
        Keys["GUILD_NAME"] = "GUILD_NAME";
        Keys["GUILD_ACRONYM"] = "GUILD_ACRONYM";
        Keys["GUILD_BANNER"] = "GUILD_BANNER";
        Keys["GUILD_MEMBER_COUNT"] = "GUILD_MEMBER_COUNT";
        Keys["LOGICAL_SET"] = "LOGICAL_SET";
        Keys["LOGICAL_GET"] = "LOGICAL_GET";
        Keys["LOGICAL_IF"] = "LOGICAL_IF";
        Keys["MATH_E"] = "MATH_E";
        Keys["MATH_LN10"] = "MATH_LN10";
        Keys["MATH_LN2"] = "MATH_LN2";
        Keys["MATH_LOG10E"] = "MATH_LOG10E";
        Keys["MATH_LOG2E"] = "MATH_LOG2E";
        Keys["MATH_PI"] = "MATH_PI";
        Keys["MATH_SQRT1_2"] = "MATH_SQRT1_2";
        Keys["MATH_SQRT2"] = "MATH_SQRT2";
        Keys["MATH_ABS"] = "MATH_ABS";
        Keys["MATH_ACOS"] = "MATH_ACOS";
        Keys["MATH_ACOSH"] = "MATH_ACOSH";
        Keys["MATH_ASIN"] = "MATH_ASIN";
        Keys["MATH_ASINH"] = "MATH_ASINH";
        Keys["MATH_ATAN"] = "MATH_ATAN";
        Keys["MATH_ATAN2"] = "MATH_ATAN2";
        Keys["MATH_ATANH"] = "MATH_ATANH";
        Keys["MATH_CBRT"] = "MATH_CBRT";
        Keys["MATH_CEIL"] = "MATH_CEIL";
        Keys["MATH_CLZ32"] = "MATH_CLZ32";
        Keys["MATH_COS"] = "MATH_COS";
        Keys["MATH_COSH"] = "MATH_COSH";
        Keys["MATH_EXP"] = "MATH_EXP";
        Keys["MATH_EXPM1"] = "MATH_EXPM1";
        Keys["MATH_FLOOR"] = "MATH_FLOOR";
        Keys["MATH_FROUND"] = "MATH_FROUND";
        Keys["MATH_HYPOT"] = "MATH_HYPOT";
        Keys["MATH_IMUL"] = "MATH_IMUL";
        Keys["MATH_LOG"] = "MATH_LOG";
        Keys["MATH_LOG10"] = "MATH_LOG10";
        Keys["MATH_LOG1P"] = "MATH_LOG1P";
        Keys["MATH_LOG2"] = "MATH_LOG2";
        Keys["MATH_MAX"] = "MATH_MAX";
        Keys["MATH_MIN"] = "MATH_MIN";
        Keys["MATH_POW"] = "MATH_POW";
        Keys["MATH_RANDOM"] = "MATH_RANDOM";
        Keys["MATH_ROUND"] = "MATH_ROUND";
        Keys["MATH_SIGN"] = "MATH_SIGN";
        Keys["MATH_SIN"] = "MATH_SIN";
        Keys["MATH_SINH"] = "MATH_SINH";
        Keys["MATH_SQRT"] = "MATH_SQRT";
        Keys["MATH_TAN"] = "MATH_TAN";
        Keys["MATH_TANH"] = "MATH_TANH";
        Keys["MATH_TRUNC"] = "MATH_TRUNC";
        Keys["STRING_LENGTH"] = "STRING_LENGTH";
        Keys["STRING_CONCAT"] = "STRING_CONCAT";
        Keys["STRING_CONTAINS"] = "STRING_CONTAINS";
        Keys["STRING_STARTS_WITH"] = "STRING_STARTS_WITH";
        Keys["STRING_ENDS_WITH"] = "STRING_ENDS_WITH";
        Keys["STRING_INDEX_OF"] = "STRING_INDEX_OF";
        Keys["STRING_LAST_INDEX_OF"] = "STRING_LAST_INDEX_OF";
        Keys["STRING_REVERSE"] = "STRING_REVERSE";
        Keys["STRING_SUBSTRING"] = "STRING_SUBSTRING";
        Keys["STRING_TO_LOWER_CASE"] = "STRING_TO_LOWER_CASE";
        Keys["STRING_TO_UPPER_CASE"] = "STRING_TO_UPPER_CASE";
        Keys["ARGS_COUNT"] = "ARGS_COUNT";
        Keys["ARGS"] = "ARGS";
        Keys["RANDOM_PICK"] = "PICK";
        Keys["STRING"] = "STRING";
    })(Keys = Tags.Keys || (Tags.Keys = {}));
    Tags.Names = {
        [Keys.TEST]: ["test"],
        [Keys.USER_ID]: ["user.id", "user"],
        [Keys.USER_NAME]: ["user.name"],
        [Keys.USER_DISCRIMINATOR]: ["user.discriminator", "user.discrim"],
        [Keys.USER_AVATAR]: ["user.avatar"],
        [Keys.USER_MENTION]: ["user.mention"],
        [Keys.USER_TAG]: ["user.tag"],
        [Keys.CHANNEL_ID]: ["channel.id", "channel"],
        [Keys.CHANNEL_NAME]: ["channel.name"],
        [Keys.CHANNEL_MENTION]: ["channel.mention"],
        [Keys.CHANNEL_TYPE]: ["channel.type"],
        [Keys.CHANNEL_NSFW]: ["channel.nsfw"],
        [Keys.CHANNEL_BITRATE]: ["channel.bitrate"],
        [Keys.CHANNEL_USER_COUNT]: ["channel.usercount"],
        [Keys.GUILD_ID]: ["guild.id", "guild"],
        [Keys.GUILD_NAME]: ["guild.name"],
        [Keys.GUILD_ACRONYM]: ["guild.acronym"],
        [Keys.GUILD_BANNER]: ["guild.banner"],
        [Keys.GUILD_MEMBER_COUNT]: ["guild.membercount"],
        [Keys.LOGICAL_SET]: ["logic.set", "set"],
        [Keys.LOGICAL_GET]: ["logic.get", "get"],
        [Keys.LOGICAL_IF]: ["logic.if", "if"],
        [Keys.MATH_E]: ["math.e", "e"],
        [Keys.MATH_LN10]: ["math.ln10", "ln10"],
        [Keys.MATH_LN2]: ["math.ln2", "ln2"],
        [Keys.MATH_LOG10E]: ["math.log10e", "log10e"],
        [Keys.MATH_LOG2E]: ["math.log2e", "log2e"],
        [Keys.MATH_PI]: ["math.pi", "pi"],
        [Keys.MATH_SQRT1_2]: ["math.sqrt1_2", "sqrt1_2"],
        [Keys.MATH_SQRT2]: ["math.sqrt2", "sqrt2"],
        [Keys.MATH_ABS]: ["math.abs", "abs"],
        [Keys.MATH_ACOS]: ["math.acos", "acos"],
        [Keys.MATH_ACOSH]: ["math.acosh", "acosh"],
        [Keys.MATH_ASIN]: ["math.asin", "asin"],
        [Keys.MATH_ASINH]: ["math.asinh", "asinh"],
        [Keys.MATH_ATAN]: ["math.atan", "atan"],
        [Keys.MATH_ATAN2]: ["math.atan2", "atan2"],
        [Keys.MATH_ATANH]: ["math.atanh", "atanh"],
        [Keys.MATH_CBRT]: ["math.cbrt", "cbrt"],
        [Keys.MATH_CEIL]: ["math.ceil", "ceil"],
        [Keys.MATH_CLZ32]: ["math.clz32", "clz32"],
        [Keys.MATH_COS]: ["math.cos", "cos"],
        [Keys.MATH_COSH]: ["math.cosh", "cosh"],
        [Keys.MATH_EXP]: ["math.exp", "exp"],
        [Keys.MATH_EXPM1]: ["math.expm1", "expm1"],
        [Keys.MATH_FLOOR]: ["math.floor", "floor"],
        [Keys.MATH_FROUND]: ["math.fround", "fround"],
        [Keys.MATH_HYPOT]: ["math.hypot", "hypot"],
        [Keys.MATH_IMUL]: ["math.imul", "imul"],
        [Keys.MATH_LOG]: ["math.log", "log"],
        [Keys.MATH_LOG10]: ["math.log10", "log10"],
        [Keys.MATH_LOG1P]: ["math.log1p", "log1p"],
        [Keys.MATH_LOG2]: ["math.log2", "log2"],
        [Keys.MATH_MAX]: ["math.max", "max"],
        [Keys.MATH_MIN]: ["math.min", "min"],
        [Keys.MATH_POW]: ["math.pow", "pow"],
        [Keys.MATH_RANDOM]: ["math.random", "random"],
        [Keys.MATH_ROUND]: ["math.round", "round"],
        [Keys.MATH_SIGN]: ["math.sign", "sign"],
        [Keys.MATH_SIN]: ["math.sin", "sin"],
        [Keys.MATH_SINH]: ["math.sinh", "sinh"],
        [Keys.MATH_SQRT]: ["math.sqrt", "sqrt"],
        [Keys.MATH_TAN]: ["math.tan", "tan"],
        [Keys.MATH_TANH]: ["math.tanh", "tanh"],
        [Keys.MATH_TRUNC]: ["math.trunc", "trunc"],
        [Keys.STRING_CONCAT]: ["string.concat", "concat"],
        [Keys.STRING_CONTAINS]: ["string.contains", "contains"],
        [Keys.STRING_ENDS_WITH]: ["string.endswith", "endswith"],
        [Keys.STRING_INDEX_OF]: ["string.indexof", "indexof"],
        [Keys.STRING_LENGTH]: ["string.length", "length"],
        [Keys.STRING_TO_LOWER_CASE]: [
            "string.lowercase",
            "lowercase",
            "string.lower",
            "lower",
        ],
        [Keys.STRING_TO_UPPER_CASE]: [
            "string.uppercase",
            "uppercase",
            "string.upper",
            "upper",
        ],
        [Keys.STRING_STARTS_WITH]: ["string.startswith", "startswith"],
        [Keys.STRING_SUBSTRING]: ["string.substring", "substring"],
        [Keys.STRING_LAST_INDEX_OF]: ["string.lastindexof", "lastindexof"],
        [Keys.STRING_REVERSE]: ["string.reverse", "reverse"],
        [Keys.ARGS_COUNT]: ["args.count"],
        [Keys.ARGS]: ["args"],
        [Keys.RANDOM_PICK]: ["random.pick", "pick"],
        [Keys.STRING]: ["string"],
    };
    Tags.Scripts = {
        [Keys.TEST]: () => true,
        [Keys.USER_ID]: Helpers.user("id"),
        [Keys.USER_NAME]: Helpers.user("name"),
        [Keys.USER_DISCRIMINATOR]: Helpers.user("discriminator"),
        [Keys.USER_AVATAR]: Helpers.user("avatarUrl"),
        [Keys.USER_MENTION]: Helpers.user("mention"),
        [Keys.USER_TAG]: Helpers.user("tag"),
        [Keys.CHANNEL_ID]: Helpers.channel("id"),
        [Keys.CHANNEL_NAME]: Helpers.channel("name"),
        [Keys.CHANNEL_MENTION]: Helpers.channel("mention"),
        [Keys.CHANNEL_TYPE]: Helpers.channel("type"),
        [Keys.CHANNEL_NSFW]: Helpers.channel("nsfw"),
        [Keys.CHANNEL_BITRATE]: Helpers.channel("bitrate"),
        [Keys.CHANNEL_USER_COUNT]: Helpers.channel("userLimit"),
        [Keys.GUILD_ID]: Helpers.guild("id"),
        [Keys.GUILD_NAME]: Helpers.guild("name"),
        [Keys.GUILD_ACRONYM]: Helpers.guild("acronym"),
        [Keys.GUILD_BANNER]: Helpers.guild("banner"),
        [Keys.GUILD_MEMBER_COUNT]: Helpers.guild("memberCount"),
        [Keys.LOGICAL_GET]: async function (_, arg, __, ___, tag) {
            const key = arg.trim();
            if (key.startsWith(Tags.PRIVATE_VARIABLE_PREFIX)) {
                throw new error_1.Err("Cannot access private variables", { status: 403 });
            }
            if (key.length > Limits.VARIABLE_KEY_LENGTH) {
                throw new error_1.Err("Variable key too long", { status: 413 });
            }
            if (key in tag.variables) {
                tag.text += tag.variables[key];
                return true;
            }
            return true;
        },
        [Keys.LOGICAL_SET]: async function (_, __, [key, value], ___, tag) {
            if (!key || !value) {
                return false;
            }
            if (key.startsWith(Tags.PRIVATE_VARIABLE_PREFIX)) {
                throw new error_1.Err("Cannot access private variables", { status: 403 });
            }
            if (key.length > Limits.VARIABLE_KEY_LENGTH) {
                throw new error_1.Err("Variable key too long", { status: 413 });
            }
            if (!(key in tag.variables)) {
                const variableCount = Object.keys(tag.variables).filter((x) => !x.startsWith(Tags.PRIVATE_VARIABLE_PREFIX)).length;
                if (variableCount >= Limits.VARIABLES) {
                    throw new error_1.Err("Reached maximum number of variables", { status: 507 });
                }
            }
            tag.variables[key] = value;
            return true;
        },
        [Keys.LOGICAL_IF]: async function (_, __, [source, comp, target, truthy, falsy], ___, tag) {
            if (!source || !comp || !target) {
                return false;
            }
            const comparison = comp;
            let output = false;
            switch (comparison) {
                case Helpers.IfComparison.EQUAL: {
                    output = source === target;
                    break;
                }
                case Helpers.IfComparison.NOT_EQUAL: {
                    output = source !== target;
                    break;
                }
                case Helpers.IfComparison.GREATER_THAN: {
                    output = source > target;
                    break;
                }
                case Helpers.IfComparison.GREATER_THAN_OR_EQUAL: {
                    output = source >= target;
                    break;
                }
                case Helpers.IfComparison.LESS_THAN: {
                    output = source < target;
                    break;
                }
                case Helpers.IfComparison.LESS_THAN_OR_EQUAL: {
                    output = source <= target;
                    break;
                }
                default: {
                    throw new error_1.Err("Invalid comparison", { status: 400 });
                }
            }
            if (output) {
                tag.text += truthy;
            }
            else {
                tag.text += falsy;
            }
            return true;
        },
        [Keys.MATH_E]: Helpers.math("E"),
        [Keys.MATH_LN10]: Helpers.math("LN10"),
        [Keys.MATH_LN2]: Helpers.math("LN2"),
        [Keys.MATH_LOG2E]: Helpers.math("LOG2E"),
        [Keys.MATH_LOG10E]: Helpers.math("LOG10E"),
        [Keys.MATH_PI]: Helpers.math("PI"),
        [Keys.MATH_SQRT1_2]: Helpers.math("SQRT1_2"),
        [Keys.MATH_SQRT2]: Helpers.math("SQRT2"),
        [Keys.MATH_ABS]: Helpers.math("abs"),
        [Keys.MATH_ACOS]: Helpers.math("acos"),
        [Keys.MATH_ACOSH]: Helpers.math("acosh"),
        [Keys.MATH_ASIN]: Helpers.math("asin"),
        [Keys.MATH_ASINH]: Helpers.math("asinh"),
        [Keys.MATH_ATAN]: Helpers.math("atan"),
        [Keys.MATH_ATANH]: Helpers.math("atan2"),
        [Keys.MATH_ATAN2]: Helpers.math("atan2"),
        [Keys.MATH_CBRT]: Helpers.math("cbrt"),
        [Keys.MATH_CEIL]: Helpers.math("ceil"),
        [Keys.MATH_COS]: Helpers.math("cos"),
        [Keys.MATH_EXP]: Helpers.math("exp"),
        [Keys.MATH_FLOOR]: Helpers.math("floor"),
        [Keys.MATH_LOG]: Helpers.math("log"),
        [Keys.MATH_RANDOM]: Helpers.math("random"),
        [Keys.MATH_ROUND]: Helpers.math("round"),
        [Keys.MATH_SIGN]: Helpers.math("sign"),
        [Keys.MATH_SIN]: Helpers.math("sin"),
        [Keys.MATH_SINH]: Helpers.math("sinh"),
        [Keys.MATH_TAN]: Helpers.math("tan"),
        [Keys.MATH_TANH]: Helpers.math("tanh"),
        [Keys.MATH_TRUNC]: Helpers.math("trunc"),
        [Keys.MATH_SQRT]: Helpers.math("sqrt"),
        [Keys.MATH_CLZ32]: Helpers.math("clz32"),
        [Keys.MATH_COSH]: Helpers.math("cosh"),
        [Keys.MATH_EXPM1]: Helpers.math("expm1"),
        [Keys.MATH_LOG1P]: Helpers.math("log1p"),
        [Keys.MATH_IMUL]: Helpers.math("imul"),
        [Keys.MATH_LOG10]: Helpers.math("log10"),
        [Keys.MATH_LOG2]: Helpers.math("log2"),
        [Keys.MATH_POW]: Helpers.math("pow"),
        [Keys.MATH_FROUND]: Helpers.math("fround"),
        [Keys.MATH_HYPOT]: Helpers.math("hypot"),
        [Keys.MATH_MAX]: Helpers.math("max"),
        [Keys.MATH_MIN]: Helpers.math("min"),
        [Keys.STRING_CONCAT]: async function (_, __, [...args], ___, tag) {
            if (!args.length) {
                return false;
            }
            tag.text += args.join("");
            return true;
        },
        [Keys.STRING_LENGTH]: async function (_, __, [source], ___, tag) {
            if (!source) {
                return false;
            }
            tag.text += source.length;
            return true;
        },
        [Keys.STRING_TO_LOWER_CASE]: async function (_, arg, ___, ____, tag) {
            tag.text += arg.toLowerCase();
            return true;
        },
        [Keys.STRING_TO_UPPER_CASE]: async function (_, arg, ___, ____, tag) {
            tag.text += arg.toUpperCase();
            return true;
        },
        [Keys.STRING_CONTAINS]: async function (_, __, [source, target], ___, tag) {
            if (!source || !target) {
                return false;
            }
            tag.text += source.includes(target);
            return true;
        },
        [Keys.STRING_INDEX_OF]: async function (_, __, [source, target], ___, tag) {
            if (!source || !target) {
                return false;
            }
            tag.text += source.indexOf(target);
            return true;
        },
        [Keys.STRING_LAST_INDEX_OF]: async function (_, __, [source, target], ___, tag) {
            if (!source || !target) {
                return false;
            }
            tag.text += source.lastIndexOf(target);
            return true;
        },
        [Keys.STRING_STARTS_WITH]: async function (_, __, [source, target], ___, tag) {
            if (!source || !target) {
                return false;
            }
            tag.text += source.startsWith(target);
            return true;
        },
        [Keys.STRING_ENDS_WITH]: async function (_, __, [source, target], ___, tag) {
            if (!source || !target) {
                return false;
            }
            tag.text += source.endsWith(target);
            return true;
        },
        [Keys.STRING_REVERSE]: async function (_, __, [source], ___, tag) {
            if (!source) {
                return false;
            }
            tag.text += source.split("").reverse().join("");
            return true;
        },
        [Keys.STRING_SUBSTRING]: async function (_, __, [source, start, end], ___, tag) {
            if (!source) {
                return false;
            }
            tag.text += source.substring(Number(start), Number(end));
            return true;
        },
        [Keys.ARGS_COUNT]: async function (_, __, ___, args, tag) {
            tag.text += args.length;
            return true;
        },
        [Keys.ARGS]: async function (_, __, ___, args, tag) {
            tag.text += args.join(" ");
            return true;
        },
        [Keys.RANDOM_PICK]: async function (_, __, passed, ____, tag) {
            if (!passed.length) {
                return false;
            }
            tag.text += passed[Math.floor(Math.random() * passed.length)];
            return true;
        },
        [Keys.STRING]: Helpers.call(String, String),
    };
    async function exec(context, script, args, variables = Object.create(null)) {
        let isFirstParse = true;
        if (Private.ITERATIONS_REMAINING in variables) {
            isFirstParse = false;
        }
        else {
            variables[Private.ITERATIONS_REMAINING] = Limits.ITERATIONS;
        }
        if (!(Private.NETWORK_REQUESTS in variables)) {
            variables[Private.NETWORK_REQUESTS] = 0;
        }
        if (!(Private.FILE_SIZE in variables)) {
            variables[Private.FILE_SIZE] = 0;
        }
        const tag = { files: [], text: "", variables };
        tag.variables[Private.ITERATIONS_REMAINING]--;
        let depth = 0;
        let scriptBuffer = "";
        let position = 0;
        while (position < script.length) {
            if (tag.variables[Private.ITERATIONS_REMAINING] <= 0) {
                tag.text += script.slice(position);
                position = script.length;
                continue;
            }
            if (depth === 0) {
                const next = script.indexOf(Tags.Symbols.START, position);
                if (next === -1) {
                    tag.text += script.slice(position);
                    position = script.length;
                    continue;
                }
                tag.text += script.slice(position, next);
                position = next;
            }
            if (Limits.NETWORK_REQUESTS <= tag.variables[Private.NETWORK_REQUESTS]) {
                throw new Error(`429: Too Many Requests (Max ${Limits.NETWORK_REQUESTS} Requests)`);
            }
            let result = script.slice(position, ++position);
            scriptBuffer += result;
            switch (result) {
                case Tags.Symbols.IGNORE: {
                    const nextValue = script.slice(position, position + 1);
                    if (nextValue === Tags.Symbols.START) {
                        depth--;
                    }
                    else if (nextValue === Tags.Symbols.END) {
                        depth++;
                    }
                    break;
                }
                case Tags.Symbols.START: {
                    depth++;
                    break;
                }
                case Tags.Symbols.END: {
                    depth--;
                    if (depth <= 0) {
                        let [name, arg] = parse(scriptBuffer);
                        const parsed = await exec(context, arg, args, tag.variables);
                        arg = parsed.text;
                        for (let file of parsed.files) {
                            tag.files.push(file);
                        }
                        for (let value of Object.values(Keys)) {
                            if (Tags.Names[value].includes(name)) {
                                const valid = await Tags.Scripts[value](context, arg, split(arg), args, tag);
                                if (!valid) {
                                    tag.text = scriptBuffer;
                                }
                                break;
                            }
                        }
                        scriptBuffer = "";
                    }
                    break;
                }
            }
        }
        tag.text = tag.text + scriptBuffer;
        if (isFirstParse) {
            tag.text = tag.text.replace(/\u200b/g, "\n");
        }
        return tag;
    }
    Tags.exec = exec;
    function parse(script) {
        let scriptName;
        let arg;
        script = script.slice(1, script.length - 1).trim();
        const firstSplitter = script.indexOf(Tags.Symbols.FUNCTION);
        if (firstSplitter === -1) {
            scriptName = script.toLowerCase();
            arg = "";
        }
        else {
            scriptName = script.slice(0, firstSplitter);
            arg = script.slice(firstSplitter + 1);
        }
        return [scriptName.toLowerCase(), arg];
    }
    Tags.parse = parse;
    function split(value) {
        let depth = 0;
        let position = 0;
        let text = "";
        const args = [];
        while (position < value.length) {
            if (depth === 0 && !text) {
                const next = value.indexOf(Tags.Symbols.START, position);
                if (next === -1) {
                    for (let x of value.slice(position).split(Tags.REGEX_ARGUMENT_SPLITTER)) {
                        x = x.replace(Tags.REGEX_ARGUMENT_SPLITTER_ESCAPE_REPLACEMENT, Tags.Symbols.ARGUMENT);
                        args.push(x);
                    }
                    position = value.length;
                    continue;
                }
            }
            let result = value.slice(position, ++position);
            text += result;
            switch (result) {
                case Tags.Symbols.ARGUMENT: {
                    if (depth <= 0) {
                        args.push(text.slice(0, -1));
                        text = "";
                    }
                    break;
                }
                case Tags.Symbols.IGNORE: {
                    const next = value.slice(position, position + 1);
                    if (next === Tags.Symbols.START) {
                        depth--;
                    }
                    else if (next === Tags.Symbols.END) {
                        depth++;
                    }
                    else if (next === Tags.Symbols.ARGUMENT) {
                        position++;
                    }
                    break;
                }
                case Tags.Symbols.START: {
                    depth++;
                    break;
                }
                case Tags.Symbols.END: {
                    depth--;
                    break;
                }
            }
        }
        if (text) {
            args.push(text);
        }
        return args;
    }
    Tags.split = split;
})(Tags = exports.Tags || (exports.Tags = {}));
