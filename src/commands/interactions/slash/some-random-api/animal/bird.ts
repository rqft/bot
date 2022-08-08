import { APIs } from "@rqft/fetch";
import { Formatter } from "../../../../../tools/formatter";
import { BaseSlashSubCommand } from "../../baseslash";

export class AnimalBirdSlashSubCommand extends BaseSlashSubCommand {
  name = "bird";
  description = "fly";

  run = Formatter.SomeRandomApi.animal(APIs.SomeRandomApi.Animals.BIRD);
}
