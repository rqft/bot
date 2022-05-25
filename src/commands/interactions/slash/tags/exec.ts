import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class TagExecSlashSubCommand extends BaseSlashSubCommand {
  name = "exec";
  description = "run tag code";
  constructor() {
    super({
      options: [
        {
          name: "script",
          description: "what to run",
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
        },
        {
          name: "args",
          description: "what to use",
          type: ApplicationCommandOptionTypes.STRING,
          required: false,
          default: [],
          value: Parameters.array(String),
        },
      ],
    });
  }
  run = Formatter.Tag.exec;
}
