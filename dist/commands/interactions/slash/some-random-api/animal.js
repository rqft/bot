"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseslash_1 = require("../baseslash");
class AnimalSlashCommandGroup extends baseslash_1.BaseSlashCommand {
    name = "animal";
    description = "cute";
    constructor() {
        super({
            options: [],
        });
    }
}
exports.default = AnimalSlashCommandGroup;
