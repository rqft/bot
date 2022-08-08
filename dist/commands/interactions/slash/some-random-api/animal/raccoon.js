"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalRaccoonSlashSubCommand = void 0;
const fetch_1 = require("@rqft/fetch");
const formatter_1 = require("../../../../../tools/formatter");
const baseslash_1 = require("../../baseslash");
class AnimalRaccoonSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "raccoon";
    description = "i love racc'd";
    run = formatter_1.Formatter.SomeRandomApi.animal(fetch_1.APIs.SomeRandomApi.Animals.RACCOON);
}
exports.AnimalRaccoonSlashSubCommand = AnimalRaccoonSlashSubCommand;
