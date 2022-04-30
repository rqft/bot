import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { Pariah } from "pariah/dist";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { Parameters } from "../../../functions/parameters";
import { capitalizeWords, editOrReply } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ToolsMetadata } from "../basecommand";
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
      metadata: ToolsMetadata(
        "Get information about a phone number",
        "<phone: Phone>",
        ["+1-555-555-5555"]
      ),
    });
  }
  async run(context: Command.Context, args: AbstractPhoneValidationArgs) {
    const abs = new Pariah(new URL("https://phonevalidation.abstractapi.com/"));
    const phone = await abs.get.json<AbstractPhone>(`/v1/`, {
      api_key: Secrets.AbstractKeys.PHONE_VALIDATION,
      phone: args.phone,
    });
    if (!phone.phone) throw new Err("Invalid phone number");
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
    return await editOrReply(context, { embed });
  }
}
