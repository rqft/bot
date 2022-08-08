import { APIs } from "@rqft/fetch";
import { Formatter } from "../../../../../tools/formatter";
import { BaseSlashSubCommand } from "../../baseslash";
export class AnimalWhaleSlashSubCommand extends BaseSlashSubCommand {
  name = "whale";
  description = "whoa";

  run = Formatter.SomeRandomApi.animal(APIs.SomeRandomApi.Animals.WHALE);
}
