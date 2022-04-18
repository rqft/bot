import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import OpenAI from "openai-api";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { editOrReply } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, FunMetadata } from "../basecommand";
export interface CompletionArgs {
  engine: string;
  input: string;
  temperature: number;
  limit: number;
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
        { name: "limit", type: "number", default: 60 },
      ],
      metadata: FunMetadata("idk")
    });
  }
  async run(context: Command.Context, args: CompletionArgs) {
    let openAi = new OpenAI(Secrets.Key.openAI);
    let completion = await openAi.complete({
      engine: args.engine,
      prompt: args.input,
      temperature: args.temperature,
      bestOf: 3,
      maxTokens: args.limit,
      stop: ["\n"],
    });
    let choices = completion.data.choices;
    const choice = choices[0]!;
    const embed = createBrandEmbed(Brand.OPENAI, context);
    embed.addField("Prompt", Markup.codeblock(args.input));
    embed.addField("Response", Markup.codeblock(choice.text));

    return editOrReply(context, { embed });
  }
}
