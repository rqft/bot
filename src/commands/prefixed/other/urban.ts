import { CommandClient } from "detritus-client";
import { FunMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class UrbanCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "urban",
      metadata: FunMetadata("the funny dictionary", "<word: string>"),
      type: [{ name: "word", type: "string", consume: true, required: true }],
    });
  }

  run = Formatter.urban;
}
