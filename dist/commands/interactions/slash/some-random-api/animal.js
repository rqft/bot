"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseslash_1 = require("../baseslash");
const bird_1 = require("./animal/bird");
const cat_1 = require("./animal/cat");
const dog_1 = require("./animal/dog");
const fox_1 = require("./animal/fox");
const kangaroo_1 = require("./animal/kangaroo");
const koala_1 = require("./animal/koala");
const panda_1 = require("./animal/panda");
const pikachu_1 = require("./animal/pikachu");
const raccoon_1 = require("./animal/raccoon");
const red_panda_1 = require("./animal/red-panda");
const whale_1 = require("./animal/whale");
class AnimalSlashCommandGroup extends baseslash_1.BaseSlashCommand {
    name = "animal";
    description = "cute";
    constructor() {
        super({
            options: [
                new bird_1.AnimalBirdSlashSubCommand(),
                new cat_1.AnimalCatSlashSubCommand(),
                new dog_1.AnimalDogSlashSubCommand(),
                new fox_1.AnimalFoxSlashSubCommand(),
                new kangaroo_1.AnimalKangarooSlashSubCommand(),
                new koala_1.AnimalKoalaSlashSubCommand(),
                new panda_1.AnimalPandaSlashSubCommand(),
                new pikachu_1.AnimalPikachuSlashSubCommand(),
                new raccoon_1.AnimalRaccoonSlashSubCommand(),
                new red_panda_1.AnimalRedPandaSlashSubCommand(),
                new whale_1.AnimalWhaleSlashSubCommand(),
            ],
        });
    }
}
exports.default = AnimalSlashCommandGroup;
