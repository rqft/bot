import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class RoleSlashSubCommand extends BaseSlashSubCommand {
  name = "role";
  description = "role info";
  constructor() {
    super({
      options: [
        {
          name: "role",
          description: "what",
          type: ApplicationCommandOptionTypes.ROLE,
          default: Parameters.Default.defaultRole,
        },
      ],
    });
  }

  run = Formatter.Info.role;
}