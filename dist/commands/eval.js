"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("detritus-client/lib/utils");
const imagescript_1 = __importStar(require("imagescript"));
const v2_1 = __importStar(require("imagescript/v2"));
const typescript_1 = __importStar(require("typescript"));
const util_1 = require("util");
const formatter_1 = require("../tools/formatter");
const util_2 = require("../tools/util");
const builder_1 = require("../wrap/builder");
exports.default = (0, builder_1.Command)('eval [...code]', {
    args: (self) => ({ code: self.string() }),
    metadata: {
        description: 'evaluate some code',
        examples: ['1 + 1 // what is it', 'let a: 1 = 1; a'],
        type: 'miscellaneous',
    },
}, async (context, args) => {
    console.log('test');
    if (!context.user.isClientOwner &&
        context.userId !== '312715611413413889') {
        console.log('!!!');
        return;
    }
    let data;
    try {
        const [is, i2, ansi] = [imagescript_1.default, v2_1.default, formatter_1.Ansi.Fmt];
        const js = typescript_1.default.transpileModule(args.code, {
            reportDiagnostics: true,
            compilerOptions: {
                allowUnreachableCode: false,
                allowUnusedLabels: false,
                exactOptionalPropertyTypes: true,
                noFallthroughCasesInSwitch: true,
                noImplicitAny: true,
                noImplicitOverride: true,
                noImplicitReturns: true,
                noImplicitThis: true,
                noPropertyAccessFromIndexSignature: true,
                noUncheckedIndexedAccess: true,
                noUnusedLocals: true,
                noUnusedParameters: true,
                strictBindCallApply: true,
                strictFunctionTypes: true,
                strictNullChecks: true,
                strictPropertyInitialization: true,
                useUnknownInCatchVariables: false,
            },
        });
        if (js.diagnostics?.length) {
            return await (0, util_2.respond)(context, utils_1.Markup.codeblock((0, typescript_1.formatDiagnosticsWithColorAndContext)(js.diagnostics, {
                getCurrentDirectory() {
                    return '(unknown)';
                },
                getCanonicalFileName(fileName) {
                    return `[${fileName}]`;
                },
                getNewLine() {
                    return '\n';
                },
            })));
        }
        data = await Promise.resolve(eval(js.outputText));
        [is, i2, ansi].sort();
    }
    catch (e) {
        data = e;
    }
    if (data instanceof imagescript_1.Frame || data instanceof imagescript_1.GIF || data instanceof imagescript_1.Image) {
        return await (0, util_2.respond)(context, {
            files: [
                {
                    filename: 'out.' + (data instanceof imagescript_1.GIF ? 'gif' : 'png'),
                    value: Buffer.from(await data.encode()),
                },
            ],
        });
    }
    if (data instanceof v2_1.Animation || data instanceof v2_1.Image) {
        if (data instanceof v2_1.Animation) {
            return await (0, util_2.respond)(context, {
                files: [
                    {
                        filename: 'out.gif',
                        value: Buffer.from(await data.encode('gif')),
                    },
                ],
            });
        }
        return await (0, util_2.respond)(context, {
            files: [
                { filename: 'out.png', value: Buffer.from(await data.encode('png')) },
            ],
        });
    }
    return await (0, util_2.respond)(context, utils_1.Markup.codeblock((0, util_1.inspect)(data || '[no data]', {
        depth: 3,
        showProxy: true,
        colors: true,
    }), { language: 'ansi' }));
});
