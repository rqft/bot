import { CommandClient } from "detritus-client";
import { FunMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class SearchUrbanCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "urban",
      metadata: FunMetadata("the funny dictionary", "<word: string>", [
        "clancy",
      ]),
      type: [{ name: "word", type: "string", consume: true, required: true }],
    });
  }

  run = Formatter.Search.urban;
}
