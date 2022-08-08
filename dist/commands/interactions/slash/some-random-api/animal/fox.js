"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalFoxSlashSubCommand = void 0;
const fetch_1 = require("@rqft/fetch");
const formatter_1 = require("../../../../../tools/formatter");
const baseslash_1 = require("../../baseslash");
class AnimalFoxSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "fox";
    description = "ring dingidingign";
    run = formatter_1.Formatter.SomeRandomApi.animal(fetch_1.APIs.SomeRandomApi.Animals.FOX);
}
exports.AnimalFoxSlashSubCommand = AnimalFoxSlashSubCommand;
