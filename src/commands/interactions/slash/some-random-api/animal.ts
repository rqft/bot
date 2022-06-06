import { BaseSlashCommand } from "../baseslash";
import { AnimalBirdSlashSubCommand } from "./animal/bird";
import { AnimalCatSlashSubCommand } from "./animal/cat";
import { AnimalDogSlashSubCommand } from "./animal/dog";
import { AnimalFoxSlashSubCommand } from "./animal/fox";
import { AnimalKangarooSlashSubCommand } from "./animal/kangaroo";
import { AnimalKoalaSlashSubCommand } from "./animal/koala";
import { AnimalPandaSlashSubCommand } from "./animal/panda";
import { AnimalPikachuSlashSubCommand } from "./animal/pikachu";
import { AnimalRaccoonSlashSubCommand } from "./animal/raccoon";
import { AnimalRedPandaSlashSubCommand } from "./animal/red-panda";
import { AnimalWhaleSlashSubCommand } from "./animal/whale";

export default class AnimalSlashCommandGroup extends BaseSlashCommand {
  name = "animal";
  description = "cute";
  constructor() {
    super({
      options: [
        new AnimalBirdSlashSubCommand(),
        new AnimalCatSlashSubCommand(),
        new AnimalDogSlashSubCommand(),
        new AnimalFoxSlashSubCommand(),
        new AnimalKangarooSlashSubCommand(),
        new AnimalKoalaSlashSubCommand(),
        new AnimalPandaSlashSubCommand(),
        new AnimalPikachuSlashSubCommand(),
        new AnimalRaccoonSlashSubCommand(),
        new AnimalRedPandaSlashSubCommand(),
        new AnimalWhaleSlashSubCommand(),
      ],
    });
  }
}
