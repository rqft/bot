"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalWhaleSlashSubCommand = void 0;
const fetch_1 = require("@rqft/fetch");
const formatter_1 = require("../../../../../tools/formatter");
const baseslash_1 = require("../../baseslash");
class AnimalWhaleSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "whale";
    description = "whoa";
    run = formatter_1.Formatter.SomeRandomApi.animal(fetch_1.APIs.SomeRandomApi.Animals.WHALE);
}
exports.AnimalWhaleSlashSubCommand = AnimalWhaleSlashSubCommand;
