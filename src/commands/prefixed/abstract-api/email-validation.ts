import { Command, CommandClient } from "detritus-client";
import { Pariah } from "pariah/dist";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { Parameters } from "../../../functions/parameters";
import { editOrReply } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ToolsMetadata } from "../basecommand";
export interface AbstractEmailValidationArgs {
  email: string;
}
export interface AbstractEmail {
  email: string;
  autocorrect: string;
  deliverability: "DELIVERABLE" | "UNKNOWN" | "UNDELIVERABLE";
  quality_score: number;
  is_valid_format: AbstractEmailBool;
  is_free_email: AbstractEmailBool;
  is_disposable_email: AbstractEmailBool;
  is_role_email: AbstractEmailBool;
  is_catchall_email: AbstractEmailBool;
  is_mx_found: AbstractEmailBool;
  is_smtp_valid: AbstractEmailBool;
}
export interface AbstractEmailBool {
  value: boolean;
  text: "TRUE" | "FALSE";
}
export function fixEmailBool(bool: AbstractEmailBool) {
  return bool.value ? "Yes" : "No";
}
export default class AbstractEmailValidationCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "email-validation",
      aliases: ["emailvalidation", "email"],

      label: "email",
      type: Parameters.email,
      required: true,
      metadata: ToolsMetadata("Validates an email address and returns some information on it", "<email: Email>", ["a@rqft.space", "contact@discard.cc"])
    });
  }
  async run(context: Command.Context, args: AbstractEmailValidationArgs) {
    const abs = new Pariah({
      baseUrl: "https://emailvalidation.abstractapi.com/",
    });

    const email = await abs.getJSON<AbstractEmail>(
      `/v1/${abs.toUrlParams({
        api_key: Secrets.AbstractKeys.EMAIL_VALIDATION,
        email: args.email,
      })}`
    );
    if (!email.email || email.deliverability === "UNDELIVERABLE") {
      throw new Err("No email found", { status: 404 });
    }

    const embed = createBrandEmbed(Brand.ABSTRACT, context);
    embed.setTitle(`Email Information for ${email.email}`);
    {
      const description: Array<string> = [];
      description.push(`**Address:** \`${email.email}\``);
      if (email.autocorrect !== "")
        description.push(`**Autocorrect:** ${email.autocorrect}`);

      description.push(
        `**Deliverable:** ${
          email.deliverability === "DELIVERABLE" ? "Yes" : "Unknown"
        }`
      );
      description.push(`**Quality Score:** ${email.quality_score}`);

      description.push(
        `\n**Is Valid Format:** ${fixEmailBool(email.is_valid_format)}`
      );
      description.push(
        `**Is Free Email:** ${fixEmailBool(email.is_free_email)}`
      );
      description.push(
        `**Is Disposable Email:** ${fixEmailBool(email.is_disposable_email)}`
      );
      description.push(
        `**Is Role Email:** ${fixEmailBool(email.is_role_email)}`
      );
      description.push(
        `**Is Catchall Email:** ${fixEmailBool(email.is_catchall_email)}`
      );
      description.push(`**MX Found:** ${fixEmailBool(email.is_mx_found)}`);
      description.push(`**SMTP Valid:** ${fixEmailBool(email.is_smtp_valid)}`);
      embed.setDescription(description.join("\n"));
    }

    return await editOrReply(context, { embed });
  }
}
