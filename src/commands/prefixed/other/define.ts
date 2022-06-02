import { CommandClient } from "detritus-client";
import { FunMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class DefineCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "define",
      metadata: FunMetadata("merriam", "<word: string>"),
      type: [{ name: "word", type: "string", consume: true }],
    });
  }

  run = Formatter.define;
}
