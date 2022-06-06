import { BaseSlashCommand } from "../baseslash";

export default class AnimalSlashCommandGroup extends BaseSlashCommand {
  name = "animal";
  description = "cute";
  constructor() {
    super({
      options: [],
    });
  }
}
