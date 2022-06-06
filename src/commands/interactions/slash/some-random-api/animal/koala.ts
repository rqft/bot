import { APIs } from "pariah";
import { Formatter } from "../../../../../tools/formatter";
import { BaseSlashSubCommand } from "../../baseslash";
export class AnimalKoalaSlashSubCommand extends BaseSlashSubCommand {
  name = "koala";
  description = "hangy guys";

  run = Formatter.SomeRandomApi.animal(APIs.SomeRandomApi.Animals.KOALA);
}
