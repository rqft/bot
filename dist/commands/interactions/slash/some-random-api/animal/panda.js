"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalPandaSlashSubCommand = void 0;
const pariah_1 = require("pariah");
const formatter_1 = require("../../../../../tools/formatter");
const baseslash_1 = require("../../baseslash");
class AnimalPandaSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "panda";
    description = "what sound does a panda make wtf";
    run = formatter_1.Formatter.SomeRandomApi.animal(pariah_1.APIs.SomeRandomApi.Animals.PANDA);
}
exports.AnimalPandaSlashSubCommand = AnimalPandaSlashSubCommand;
