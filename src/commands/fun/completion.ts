import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import OpenAI from "openai-api";
import { Brand } from "../../enums/brands";
import { createBrandEmbed } from "../../functions/embed";
import { Paginator } from "../../functions/paginator";
import { colorPercent } from "../../functions/tools";
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
        { name: "engine", type: "string", default: "davinci" },
        { name: "temperature", type: "number", default: 0.5 },
      ],
    });
  }
  async run(context: Command.Context, args: CompletionArgs) {
    let openAi = new OpenAI(Secrets.Key.DEEP_AI);
    let completion = await openAi.complete({
      engine: args.engine,
      prompt: args.input,
      temperature: args.temperature,
      bestOf: 5,
    });
    let pageLimit = completion.data.choices.length;
    new Paginator(context, {
      pageLimit,
      onPage: (page) => {
        const embed = createBrandEmbed(Brand.OPENAI, context);
        embed.setTitle(`OpenAI Completion (${args.engine})`);
        embed.setDescription(
          Markup.codeblock(
            completion.data.choices[page]!.text.replace(args.input, "[$&]")
          )
        );
        embed.setColor(colorPercent(args.temperature, 0, 0));
        return embed;
      },
    });
  }
}
