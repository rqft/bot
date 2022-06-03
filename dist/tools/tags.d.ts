import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Attachment, Channel, Guild, User } from "detritus-client/lib/structures";
export declare namespace Tags {
    const Symbols: {
        START: string;
        END: string;
        IGNORE: string;
        ARGUMENT: string;
        FUNCTION: string;
    };
    enum Limits {
        ITERATIONS = 150,
        NETWORK_REQUESTS = 10,
        REGEX_TIME = 25,
        REPEAT_AMOUNT = 4000,
        STRING_LENGTH = 10000,
        VARIABLE_KEY_LENGTH = 64,
        VARIABLE_LENGTH = 4000,
        VARIABLES = 100
    }
    const PRIVATE_VARIABLE_PREFIX = "__";
    const SCRIPT_REGEX: RegExp;
    const REGEX_ARGUMENT_SPLITTER: RegExp;
    const REGEX_ARGUMENT_SPLITTER_ESCAPE_REPLACEMENT: RegExp;
    function parse(script: string): [string, string];
    function split(value: string): Array<string>;
    enum Private {
        FILE_SIZE = "__fileSize",
        ITERATIONS_REMAINING = "__iterationsRemaining",
        NETWORK_REQUESTS = "__networkRequests"
    }
    interface Variables {
        [Private.FILE_SIZE]: number;
        [Private.ITERATIONS_REMAINING]: number;
        [Private.NETWORK_REQUESTS]: number;
        [key: string]: number | string;
    }
    interface Result {
        files: Array<Attachment>;
        text: string;
        variables: Variables;
    }
    type Script = (context: Context | InteractionContext, arg: string, passed: Array<string>, args: Array<string>, tag: Result) => Promise<boolean> | boolean;
    namespace Helpers {
        function constant<T>(value: T): Script;
        function call<T, U>(callback: (...args: Array<T>) => U, reviver: (value: string) => T): Script;
        function user(property: keyof User): Script;
        function channel(property: keyof Channel): Script;
        function guild(property: keyof Guild): Script;
        function math(property: keyof Math): Script;
        enum IfComparison {
            EQUAL = "=",
            GREATER_THAN = ">",
            GREATER_THAN_OR_EQUAL = ">=",
            LESS_THAN = "<",
            LESS_THAN_OR_EQUAL = "<=",
            NOT_EQUAL = "!="
        }
    }
    enum Keys {
        TEST = "TEST",
        USER_ID = "USER_ID",
        USER_NAME = "USER_NAME",
        USER_DISCRIMINATOR = "USER_DISCRIMINATOR",
        USER_AVATAR = "USER_AVATAR",
        USER_MENTION = "USER_MENTION",
        USER_TAG = "USER_TAG",
        CHANNEL_ID = "CHANNEL_ID",
        CHANNEL_NAME = "CHANNEL_NAME",
        CHANNEL_MENTION = "CHANNEL_MENTION",
        CHANNEL_TYPE = "CHANNEL_TYPE",
        CHANNEL_NSFW = "CHANNEL_NSFW",
        CHANNEL_BITRATE = "CHANNEL_BITRATE",
        CHANNEL_USER_COUNT = "CHANNEL_USER_COUNT",
        GUILD_ID = "GUILD_ID",
        GUILD_NAME = "GUILD_NAME",
        GUILD_ACRONYM = "GUILD_ACRONYM",
        GUILD_BANNER = "GUILD_BANNER",
        GUILD_MEMBER_COUNT = "GUILD_MEMBER_COUNT",
        LOGICAL_SET = "LOGICAL_SET",
        LOGICAL_GET = "LOGICAL_GET",
        LOGICAL_IF = "LOGICAL_IF",
        MATH_E = "MATH_E",
        MATH_LN10 = "MATH_LN10",
        MATH_LN2 = "MATH_LN2",
        MATH_LOG10E = "MATH_LOG10E",
        MATH_LOG2E = "MATH_LOG2E",
        MATH_PI = "MATH_PI",
        MATH_SQRT1_2 = "MATH_SQRT1_2",
        MATH_SQRT2 = "MATH_SQRT2",
        MATH_ABS = "MATH_ABS",
        MATH_ACOS = "MATH_ACOS",
        MATH_ACOSH = "MATH_ACOSH",
        MATH_ASIN = "MATH_ASIN",
        MATH_ASINH = "MATH_ASINH",
        MATH_ATAN = "MATH_ATAN",
        MATH_ATAN2 = "MATH_ATAN2",
        MATH_ATANH = "MATH_ATANH",
        MATH_CBRT = "MATH_CBRT",
        MATH_CEIL = "MATH_CEIL",
        MATH_CLZ32 = "MATH_CLZ32",
        MATH_COS = "MATH_COS",
        MATH_COSH = "MATH_COSH",
        MATH_EXP = "MATH_EXP",
        MATH_EXPM1 = "MATH_EXPM1",
        MATH_FLOOR = "MATH_FLOOR",
        MATH_FROUND = "MATH_FROUND",
        MATH_HYPOT = "MATH_HYPOT",
        MATH_IMUL = "MATH_IMUL",
        MATH_LOG = "MATH_LOG",
        MATH_LOG10 = "MATH_LOG10",
        MATH_LOG1P = "MATH_LOG1P",
        MATH_LOG2 = "MATH_LOG2",
        MATH_MAX = "MATH_MAX",
        MATH_MIN = "MATH_MIN",
        MATH_POW = "MATH_POW",
        MATH_RANDOM = "MATH_RANDOM",
        MATH_ROUND = "MATH_ROUND",
        MATH_SIGN = "MATH_SIGN",
        MATH_SIN = "MATH_SIN",
        MATH_SINH = "MATH_SINH",
        MATH_SQRT = "MATH_SQRT",
        MATH_TAN = "MATH_TAN",
        MATH_TANH = "MATH_TANH",
        MATH_TRUNC = "MATH_TRUNC",
        STRING_LENGTH = "STRING_LENGTH",
        STRING_CONCAT = "STRING_CONCAT",
        STRING_CONTAINS = "STRING_CONTAINS",
        STRING_STARTS_WITH = "STRING_STARTS_WITH",
        STRING_ENDS_WITH = "STRING_ENDS_WITH",
        STRING_INDEX_OF = "STRING_INDEX_OF",
        STRING_LAST_INDEX_OF = "STRING_LAST_INDEX_OF",
        STRING_REVERSE = "STRING_REVERSE",
        STRING_SUBSTRING = "STRING_SUBSTRING",
        STRING_TO_LOWER_CASE = "STRING_TO_LOWER_CASE",
        STRING_TO_UPPER_CASE = "STRING_TO_UPPER_CASE",
        ARGS_COUNT = "ARGS_COUNT",
        ARGS = "ARGS",
        RANDOM_PICK = "PICK",
        STRING = "STRING"
    }
    const Names: Record<Keys, Array<string>>;
    const Scripts: Record<Keys, Script>;
    function exec(context: Context | InteractionContext, script: string, args: Array<string>, variables?: Variables): Promise<Result>;
}
