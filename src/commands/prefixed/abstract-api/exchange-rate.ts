import { Command, CommandClient } from "detritus-client";
import { MarkupTimestampStyles } from "detritus-client/lib/constants";
import { Markup } from "detritus-client/lib/utils";
import { Pariah } from "pariah/dist";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { editOrReply } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ToolsMetadata } from "../basecommand";
export interface AbstractExchangeRateArgs {
  from: string;
  to: string;
}
export interface AbstractExchangeRate {
  base: string;
  last_updated: number;
  exchange_rates: {
    [key: string]: number;
  };
}
export default class AbstractExchangeRateCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "exchange-rate",
      aliases: ["exchange", "exchangerate", "er"],

      label: "to",
      type: "string",
      required: true,

      args: [{ name: "from", type: "string", default: "USD" }],
<<<<<<< HEAD
      metadata: ToolsMetadata(
        "Get an exchange rate between currencies",
        "<to: Currency> <-from: Currency=USD>",
        ["US -from EUR", "EUR -to USD"]
      ),
=======
      metadata: ToolsMetadata("Get the exchange rate from one currency to another", "<to: Currency> ?<from: Currency=USD>")
>>>>>>> 71105518172e247128e81161bdf8e2d73b9355fb
    });
  }
  async run(context: Command.Context, args: AbstractExchangeRateArgs) {
    const abs = new Pariah({
      baseUrl: "https://exchange-rates.abstractapi.com/",
    });
    const rate = await abs.getJSON<AbstractExchangeRate>(
      `/v1/live/${abs.toUrlParams({
        api_key: Secrets.AbstractKeys.EXCHANGE_RATES,
        base: args.from,
        target: args.to,
      })}`
    );
    if (!rate.base || !rate.exchange_rates) throw new Err("no rates found");
    const embed = createBrandEmbed(Brand.ABSTRACT, context);
    embed.setDescription(
      `Last updated: ${Markup.timestamp(
        rate.last_updated,
        MarkupTimestampStyles.BOTH_LONG
      )}`
    );
    for (let k in rate.exchange_rates) {
      let v = rate.exchange_rates[k];
      if (!v) continue;
      embed.addField(`${k}`, `1 ${rate.base} -> ${v} ${k}`, true);
    }
    return editOrReply(context, { embed });
  }
}
