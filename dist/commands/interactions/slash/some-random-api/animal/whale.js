"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalWhaleSlashSubCommand = void 0;
const pariah_1 = require("pariah");
const formatter_1 = require("../../../../../tools/formatter");
const baseslash_1 = require("../../baseslash");
class AnimalWhaleSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "whale";
    description = "whoa";
    run = formatter_1.Formatter.SomeRandomApi.animal(pariah_1.APIs.SomeRandomApi.Animals.WHALE);
}
exports.AnimalWhaleSlashSubCommand = AnimalWhaleSlashSubCommand;
