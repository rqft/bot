"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalPikachuSlashSubCommand = void 0;
const pariah_1 = require("pariah");
const formatter_1 = require("../../../../../tools/formatter");
const baseslash_1 = require("../../baseslash");
class AnimalPikachuSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "pikachu";
    description = "pika piii";
    run = formatter_1.Formatter.SomeRandomApi.animal(pariah_1.APIs.SomeRandomApi.Animals.PIKACHU);
}
exports.AnimalPikachuSlashSubCommand = AnimalPikachuSlashSubCommand;
