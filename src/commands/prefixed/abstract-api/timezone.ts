import { Command, CommandClient } from "detritus-client";
import { Pariah } from "pariah/dist";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { editOrReply } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ToolsMetadata } from "../basecommand";
export interface AbstractTimezoneArgs {
  location: string;
}
export interface AbstractTimezone {
  datetime: string;
  timezone_name: string;
  timezone_location: string;
  timezone_abbreviation: string;
  gmt_offset: number;
  is_dst: boolean;
  requested_location: string;
  latitude: number;
  longitude: number;
}
export default class AbstractTimezoneCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "timezone",
      aliases: ["tz"],

      label: "location",
      type: "string",
      required: true,
<<<<<<< HEAD
      metadata: ToolsMetadata(
        "Get timezone for a location",
        "<location: string>"
      ),
=======
      metadata: ToolsMetadata("Gets info of a timezone", "<location: Timezone>")
>>>>>>> 71105518172e247128e81161bdf8e2d73b9355fb
    });
  }
  async run(context: Command.Context, args: AbstractTimezoneArgs) {
    const abs = new Pariah({ baseUrl: "https://timezone.abstractapi.com/" });
    const tz = await abs.getJSON<AbstractTimezone>(
      `/v1/current_time/${abs.toUrlParams({
        api_key: Secrets.AbstractKeys.TIMEZONE,
        location: args.location,
      })}`
    );
    if (!tz.requested_location) throw new Err("no results found");

    const embed = createBrandEmbed(Brand.ABSTRACT, context);
    embed.setTitle(`Timezone for ${tz.requested_location}`);
    {
      const description: Array<string> = [];
      description.push(
        `**Current Time**: ${new Date(tz.datetime).toLocaleString()}`
      );
      description.push(
        `**Timezone**: ${tz.timezone_name} [${tz.timezone_abbreviation}]`
      );
      description.push(`**Timezone Location**: ${tz.timezone_location}`);
      description.push(
        `**GMT Offset**: GMT${tz.gmt_offset >= 0 ? "+" : "-"}${tz.gmt_offset}`
      );
      description.push(
        `**Absolute Location**: ${tz.latitude}, ${tz.longitude}`
      );
      embed.setDescription(description.join("\n"));
    }
    return editOrReply(context, { embed });
  }
}
