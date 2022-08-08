import { APIs } from "@rqft/fetch";
import { Formatter } from "../../../../../tools/formatter";
import { BaseSlashSubCommand } from "../../baseslash";
export class AnimalFoxSlashSubCommand extends BaseSlashSubCommand {
  name = "fox";
  description = "ring dingidingign";

  run = Formatter.SomeRandomApi.animal(APIs.SomeRandomApi.Animals.FOX);
}
