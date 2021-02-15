"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const config_1 = require("../config");
__1.client.on("ready", () => {
    const ch = __1.client.channels.cache.get(config_1.config.global.logging_test);
});
