import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { Pariah } from "pariah/dist";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { Parameters } from "../../../functions/parameters";
import { capitalizeWords } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand } from "../basecommand";
export interface AbstractPhoneValidationArgs {
  phone: string;
}
export interface AbstractPhone {
  phone: string;
  valid: boolean;
  format: {
    international: string;
    local: string;
  };
  country: {
    code: string;
    name: string;
    prefix: string;
  };
  location: string;
  type: string;
  carrier: string;
}
export default class AbstractPhoneValidationCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "phone-validation",
      aliases: ["phonevalidation", "phone", "phone-number", "phonenumber"],

      label: "phone",
      type: Parameters.phone,
      required: true,
    });
  }
  async run(context: Command.Context, args: AbstractPhoneValidationArgs) {
    const abs = new Pariah({ baseUrl: "https://timezone.abstractapi.com/" });
    const phone = await abs.getJSON<AbstractPhone>(
      `/v1/current_time/${abs.toUrlParams({
        api_key: Secrets.AbstractKeys.PHONE_VALIDATION,
        phone: args.phone,
      })}`
    );
    console.log(args.phone, phone);
    if (!phone.phone) throw new Err("invalid phone number");
    const embed = createBrandEmbed(Brand.ABSTRACT, context);
    embed.setTitle(`Information for Phone Number`);
    {
      const description: Array<string> = [];
      description.push(`**Phone Number**: ${Markup.codestring(phone.phone)}`);
      description.push(`**Formats**`);
      description.push(
        `-> International: ${Markup.codestring(phone.format.international)}`
      );
      description.push(`-> Local: ${Markup.codestring(phone.format.local)}`);
      if (phone.country.name)
        description.push(
          `**Country**: ${phone.country.name} (${phone.country.code})`
        );
      if (phone.location) description.push(`**Location**: ${phone.location}`);
      if (phone.type)
        description.push(`**Type**: ${capitalizeWords(phone.type)}`);
      if (phone.carrier) description.push(`**Carrier**: ${phone.carrier}`);
      embed.setDescription(description.join("\n"));
    }
    return await context.editOrReply({ embed });
  }
}
