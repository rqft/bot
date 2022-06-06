"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalFoxSlashSubCommand = void 0;
const pariah_1 = require("pariah");
const formatter_1 = require("../../../../../tools/formatter");
const baseslash_1 = require("../../baseslash");
class AnimalFoxSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "fox";
    description = "ring dingidingign";
    run = formatter_1.Formatter.SomeRandomApi.animal(pariah_1.APIs.SomeRandomApi.Animals.FOX);
}
exports.AnimalFoxSlashSubCommand = AnimalFoxSlashSubCommand;
