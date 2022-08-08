import { APIs } from "@rqft/fetch";
import { Formatter } from "../../../../../tools/formatter";
import { BaseSlashSubCommand } from "../../baseslash";
export class AnimalKangarooSlashSubCommand extends BaseSlashSubCommand {
  name = "kangaroo";
  description = "boing";

  run = Formatter.SomeRandomApi.animal(APIs.SomeRandomApi.Animals.KANGAROO);
}
