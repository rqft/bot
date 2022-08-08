import { APIs } from "@rqft/fetch";
import { Formatter } from "../../../../../tools/formatter";
import { BaseSlashSubCommand } from "../../baseslash";
export class AnimalRaccoonSlashSubCommand extends BaseSlashSubCommand {
  name = "raccoon";
  description = "i love racc'd";

  run = Formatter.SomeRandomApi.animal(APIs.SomeRandomApi.Animals.RACCOON);
}
