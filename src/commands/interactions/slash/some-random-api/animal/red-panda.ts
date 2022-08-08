import { APIs } from "@rqft/fetch";
import { Formatter } from "../../../../../tools/formatter";
import { BaseSlashSubCommand } from "../../baseslash";
export class AnimalRedPandaSlashSubCommand extends BaseSlashSubCommand {
  name = "redpanda";
  description = "/animal panda but red.....";

  run = Formatter.SomeRandomApi.animal(APIs.SomeRandomApi.Animals.RED_PANDA);
}
