import { CommandClient } from "detritus-client";
import { FunMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class KwanziCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "kwanzi",
      metadata: FunMetadata("spams suggestions", "<text: string>"),
      type: [
          { name: "text", type: "string", consume: true },
      ]
    });
  }

    run = Formatter.kwanzi
}