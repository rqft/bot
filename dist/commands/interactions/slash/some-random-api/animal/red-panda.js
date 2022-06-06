"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalRedPandaSlashSubCommand = void 0;
const pariah_1 = require("pariah");
const formatter_1 = require("../../../../../tools/formatter");
const baseslash_1 = require("../../baseslash");
class AnimalRedPandaSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "redpanda";
    description = "/animal panda but red.....";
    run = formatter_1.Formatter.SomeRandomApi.animal(pariah_1.APIs.SomeRandomApi.Animals.RED_PANDA);
}
exports.AnimalRedPandaSlashSubCommand = AnimalRedPandaSlashSubCommand;
