import { APIs } from "@rqft/fetch";
import { Formatter } from "../../../../../tools/formatter";
import { BaseSlashSubCommand } from "../../baseslash";
export class AnimalCatSlashSubCommand extends BaseSlashSubCommand {
  name = "cat";
  description = "meow";

  run = Formatter.SomeRandomApi.animal(APIs.SomeRandomApi.Animals.CAT);
}
