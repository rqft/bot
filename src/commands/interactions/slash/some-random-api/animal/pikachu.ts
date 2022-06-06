import { APIs } from "pariah";
import { Formatter } from "../../../../../tools/formatter";
import { BaseSlashSubCommand } from "../../baseslash";
export class AnimalPikachuSlashSubCommand extends BaseSlashSubCommand {
  name = "pikachu";
  description = "pika piii";

  run = Formatter.SomeRandomApi.animal(APIs.SomeRandomApi.Animals.PIKACHU);
}
