import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import OpenAI from "openai-api";
import { Brand } from "../../enums/brands";
import { createBrandEmbed } from "../../functions/embed";
import { Secrets } from "../../secrets";
import { BaseCommand } from "../basecommand";
export interface CompletionArgs {
  engine: string;
  input: string;
  temperature: number;
}
export default class CompletionCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "completion",

      label: "input",
      type: "string",
      required: true,

      args: [
        { name: "engine", type: "string", default: "davinci-instruct-beta-v3" },
        { name: "temperature", type: "number", default: 0.5 },
      ],
    });
  }
  async run(context: Command.Context, args: CompletionArgs) {
    let openAi = new OpenAI(Secrets.Key.openAI);
    let completion = await openAi.complete({
      engine: args.engine,
      prompt: args.input,
      temperature: args.temperature,
      bestOf: 3,
      maxTokens: 100,
      stop: ["\n\n"],
    });
    let choices = completion.data.choices;
    const choice = choices[0]!;
    console.log(choice);
    const embed = createBrandEmbed(Brand.OPENAI, context);
    embed.addField("Prompt", Markup.codeblock(args.input));
    embed.addField("Response", Markup.codeblock(choice.text));

    return context.editOrReply({ embed });
  }
}