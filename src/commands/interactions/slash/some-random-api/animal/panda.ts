import { APIs } from "pariah";
import { Formatter } from "../../../../../tools/formatter";
import { BaseSlashSubCommand } from "../../baseslash";
export class AnimalPandaSlashSubCommand extends BaseSlashSubCommand {
  name = "panda";
  description = "what sound does a panda make wtf";

  run = Formatter.SomeRandomApi.animal(APIs.SomeRandomApi.Animals.PANDA);
}
