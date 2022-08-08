"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalKangarooSlashSubCommand = void 0;
const fetch_1 = require("@rqft/fetch");
const formatter_1 = require("../../../../../tools/formatter");
const baseslash_1 = require("../../baseslash");
class AnimalKangarooSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "kangaroo";
    description = "boing";
    run = formatter_1.Formatter.SomeRandomApi.animal(fetch_1.APIs.SomeRandomApi.Animals.KANGAROO);
}
exports.AnimalKangarooSlashSubCommand = AnimalKangarooSlashSubCommand;
