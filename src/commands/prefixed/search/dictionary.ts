import { CommandClient } from "detritus-client";
import { FunMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class SearchDictionaryCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "search dictionary",
      aliases: ["search dict", "search merriam"],
      metadata: FunMetadata("merriam", "<word: string>", ["hello", "monkey"]),
      type: [{ name: "word", type: "string", consume: true }],
    });
  }

  run = Formatter.Search.define;
}
