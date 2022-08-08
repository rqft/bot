import { APIs } from "@rqft/fetch";
import { Formatter } from "../../../../../tools/formatter";
import { BaseSlashSubCommand } from "../../baseslash";
export class AnimalDogSlashSubCommand extends BaseSlashSubCommand {
  name = "dog";
  description = "woof";

  run = Formatter.SomeRandomApi.animal(APIs.SomeRandomApi.Animals.DOG);
}
