import { Command, CommandClient } from "detritus-client";
import { Pariah } from "pariah/dist";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { Parameters } from "../../../functions/parameters";
import { editOrReply } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ToolsMetadata } from "../basecommand";
export interface AbstractHolidayArgs {
  date: Date;
  country: string;
}
export interface AbstractHoliday {
  name: string;
  name_local: string;
  language: string;
  description: string;
  country: string;
  location: string;
  type: string;
  date: string;
  date_year: string;
  date_month: string;
  date_day: string;
  week_day: string;
}
export default class AbstractHolidayCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "holiday",

      label: "date",
      type: Parameters.date,
      required: true,

      args: [{ name: "country", type: "string", default: "US" }],
<<<<<<< HEAD
      metadata: ToolsMetadata(
        "Get information about a holiday",
        "<date: Date> ?<-country: Country=US>"
      ),
=======
      metadata: ToolsMetadata("Gets holidays on a certain day", "<date: Date> <-country: Country=US>")
>>>>>>> 71105518172e247128e81161bdf8e2d73b9355fb
    });
  }
  async run(context: Command.Context, args: AbstractHolidayArgs) {
    const abs = new Pariah({ baseUrl: "https://holiday.abstractapi.com/" });
    const holi = await abs.getJSON<Array<AbstractHoliday>>(
      `/v1/${abs.toUrlParams({
        api_key: Secrets.AbstractKeys.HOLIDAYS,
        country: args.country,
        year: new Date().getFullYear(),
        month: args.date.getMonth() + 1,
        day: args.date.getDate(),
      })}`
    );
    console.log(holi);
    if (!holi.length) throw new Err("No holidays found", { status: 404 });

    const embed = createBrandEmbed(Brand.ABSTRACT, context);
    embed.setTitle(`Holidays for ${args.date.toLocaleDateString()}`);
    {
      const description: Array<string> = [];
      for (const holiday of holi) {
        description.push(
          `**${holiday.name}** ${
            holiday.name_local ? `(${holiday.name_local})` : ""
          }`
        );
        if (holiday.type) description.push(`*${holiday.type} holiday*\n`);
        if (holiday.description) description.push(`*${holiday.description}*\n`);
        if (holiday.location)
          description.push(`**Observed in:** ${holiday.location}`);
        description.push("\n");
      }
      embed.setDescription(description.join("\n"));
    }

    return editOrReply(context, { embed });
  }
}
