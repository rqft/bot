import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";
export default class AnimalCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "animal",
      metadata: ToolsMetadata("get animal images", "<animal: Animals>"),

      type: [
        {
          name: "animal",
          choices: Formatter.SomeRandomApi.AnimalMethods,
          required: true,
        },
      ],
    });
  }

  run = Formatter.SomeRandomApi.animal;
}
