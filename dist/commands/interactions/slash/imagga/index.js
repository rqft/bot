"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseslash_1 = require("../baseslash");
const categories_1 = require("./categories");
const colors_1 = require("./colors");
const tags_1 = require("./tags");
const test_1 = require("./test");
class ImaggaSlashCommandGroup extends baseslash_1.BaseSlashCommand {
    name = "imagga";
    description = "abusing ai";
    constructor() {
        super({
            options: [
                new tags_1.ImaggaTagsSlashSubCommand(),
                new categories_1.ImaggaCategoriesSlashSubCommand(),
                new colors_1.ImaggaColorsSlashSubCommand(),
                new test_1.ImaggaTextSlashSubCommand()
            ],
        });
    }
}
exports.default = ImaggaSlashCommandGroup;
