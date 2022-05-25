import { BaseSlashCommandGroup } from "../../baseslash";
import { PxlSearchImageSlashSubCommand } from "./image";
import { PxlSearchWebSlashSubCommand } from "./web";
export class PxlSearchSlashCommandGroup extends BaseSlashCommandGroup {
  name = "search";
  description = "searchy";
  constructor() {
    super({
      options: [
        new PxlSearchImageSlashSubCommand(),
        new PxlSearchWebSlashSubCommand(),
      ],
    });
  }
}
