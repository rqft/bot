"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const utils_1 = require("detritus-client/lib/utils");
const util_1 = require("../tools/util");
const builder_1 = require("../wrap/builder");
exports.default = (0, builder_1.Command)('exec [...code]', {
    args: (self) => ({ code: self.string() }),
    metadata: {
        description: 'ps1',
        examples: ['rm -rf /'],
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
        data = (0, child_process_1.execSync)(args.code);
    }
    catch (e) {
        data = e;
    }
    return (0, util_1.respond)(context, utils_1.Markup.codeblock(String(data), { language: 'ansi' }));
});
