import { Command, CommandClient } from "detritus-client";
import { Err } from "../../../functions/error";
import { BaseCommand, ToolsMetadata } from "../basecommand";
export interface WolframAlphaArgs {
  text: string;
}
export default class WolframAlphaCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "wolfram-alpha",
      aliases: ["wa", "wolfram", "wolframalpha"],
      type: String,
      label: "text",
      metadata: ToolsMetadata("Search Wolfram Alpha", "<text: string>"),
    });
  }
  async run(_context: Command.Context, _args: WolframAlphaArgs) {
    throw new Err("not yet");

    // const { text } = args;
    // const api = new Pariah({ baseUrl: "https://api.wolframalpha.com" });
    // const res = await api.getJSON(
    //   `/v1/result?i=${text}&appid=${Secrets.Key.wolframAlpha}&format=plaintext&units=metric&output=json`
    // );
    // console.log(res);
  }
}
