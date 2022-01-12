import { Command, CommandClient } from "detritus-client";
import { Pariah } from "pariah/dist";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Secrets } from "../../../secrets";
import { BaseCommand } from "../basecommand";
export interface AbstractIPGeolocationArgs {
  ip: string;
}
export interface AbstractIP {
  ip_address: `${number}.${number}.${number}.${number}`;
  city: string;
  city_geoname_id: number;
  region: string;
  region_iso_code: string;
  region_geoname_id: number;
  postal_code: string;
  country: string;
  country_code: string;
  country_geoname_id: number;
  country_is_eu: boolean;
  continent: string;
  continent_code: string;
  continent_geoname_id: number;
  longitude: number;
  latitude: number;
  security: {
    is_vpn: boolean;
  };
  timezone: {
    name: string;
    abbreviation: string;
    gmt_offset: number;
    current_time: string;
    is_dst: boolean;
  };
  flag: {
    emoji: string;
    unicode: string;
    png: `https://static.abstractapi.com/country-flags/${string}.png`;
    svg: `https://static.abstractapi.com/country-flags/${string}.svg`;
  };
  currency: {
    currency_name: string;
    currency_code: string;
  };
  connection: {
    autonomous_system_number: number;
    autonomous_system_organization: string;
    connection_type: string;
    isp_name: string;
    organization_name: string;
  };
}
export default class AbstractIPGeolocationCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "ip-geolocation",
      aliases: ["ipgeolocation", "ipgeo", "ip-geo", "ip"],

      label: "ip",
      type: "string",
      required: true,
    });
  }
  async run(context: Command.Context, args: AbstractIPGeolocationArgs) {
    const abs = new Pariah({
      baseUrl: "https://ipgeolocation.abstractapi.com/",
    });
    const ip = await abs.getJSON<AbstractIP>(
      `/v1/${abs.toUrlParams({
        api_key: Secrets.AbstractKeys.COMPANY_ENRICHMENT,
        ip_address: args.ip,
      })}`
    );
    if (!ip.ip_address) throw new Error("No IP found");
    if (!ip.latitude || !ip.longitude)
      throw new Error("This IP is not geolocated");
    let embed = createBrandEmbed(Brand.ABSTRACT, context);
    embed.setTitle(`Geolocation for ${ip.ip_address}`);
    {
      const description: Array<string> = [];
      description.push(
        `**Location**: ${ip.city}, ${ip.region}, ${ip.country} (Postal: ${ip.postal_code})`
      );
      description.push(`**Continent**: ${ip.continent}`);
      description.push(
        `**Absolute Location**: (${ip.longitude}, ${ip.latitude})`
      );

      description.push("\n**Timezone**");
      description.push(
        `-> **Name**: ${ip.timezone.name} (${ip.timezone.abbreviation})`
      );
      description.push(
        `-> **Code**: ${ip.timezone.is_dst ? "DST" : "GMT"} ${
          ip.timezone.gmt_offset
        }`
      );

      description.push("\n**Connection**");
      description.push(`-> **ISP**: ${ip.connection.isp_name}`);
      description.push(
        `-> **Organization**: ${ip.connection.organization_name}`
      );
      description.push(`-> **Type**: ${ip.connection.connection_type}`);
      description.push(
        `-> **ASN**: ${ip.connection.autonomous_system_organization} (${ip.connection.autonomous_system_number})`
      );

      description.push(
        `\n**Currency**: ${ip.currency.currency_name} (${ip.currency.currency_code})`
      );

      description.push(
        `\n**Security**: ${ip.security.is_vpn ? "VPN" : "Non-VPN"}`
      );
      embed.setDescription(description.join("\n"));
    }
    embed.setImage(ip.flag.png);
    return context.editOrReply({ embed });
  }
}
