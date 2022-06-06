"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalKoalaSlashSubCommand = void 0;
const pariah_1 = require("pariah");
const formatter_1 = require("../../../../../tools/formatter");
const baseslash_1 = require("../../baseslash");
class AnimalKoalaSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "koala";
    description = "hangy guys";
    run = formatter_1.Formatter.SomeRandomApi.animal(pariah_1.APIs.SomeRandomApi.Animals.KOALA);
}
exports.AnimalKoalaSlashSubCommand = AnimalKoalaSlashSubCommand;
