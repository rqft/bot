"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("./globals");
(async () => {
    globals_1.commands.addMultipleIn("./commands", { subdirectories: true });
    await globals_1.commands.run();
})();
