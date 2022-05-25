"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PxlSearchSlashCommandGroup = void 0;
const baseslash_1 = require("../../baseslash");
const image_1 = require("./image");
const web_1 = require("./web");
class PxlSearchSlashCommandGroup extends baseslash_1.BaseSlashCommandGroup {
    name = "search";
    description = "searchy";
    constructor() {
        super({
            options: [
                new image_1.PxlSearchImageSlashSubCommand(),
                new web_1.PxlSearchWebSlashSubCommand(),
            ],
        });
    }
}
exports.PxlSearchSlashCommandGroup = PxlSearchSlashCommandGroup;
