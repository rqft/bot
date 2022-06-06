"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalKangarooSlashSubCommand = void 0;
const pariah_1 = require("pariah");
const formatter_1 = require("../../../../../tools/formatter");
const baseslash_1 = require("../../baseslash");
class AnimalKangarooSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "kangaroo";
    description = "boing";
    run = formatter_1.Formatter.SomeRandomApi.animal(pariah_1.APIs.SomeRandomApi.Animals.KANGAROO);
}
exports.AnimalKangarooSlashSubCommand = AnimalKangarooSlashSubCommand;
