import { Command, CommandClient } from "detritus-client";
import { Pariah } from "pariah/dist";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { Secrets } from "../../../secrets";
import { BaseCommand } from "../basecommand";
export interface AbstractCompanyEnrichmentArgs {
  domain: string;
}
export interface AbstractCompany {
  name: string;
  domain: string;
  year_founded: number;
  industry: string;
  employees_count: number;
  locality: string;
  country: string;
  linkedin_url?: string;
}
export default class AbstractCompanyEnrichmentCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "company-enrichment",
      aliases: ["company"],

      label: "domain",
      type: "string",
      required: true,
    });
  }
  async run(context: Command.Context, args: AbstractCompanyEnrichmentArgs) {
    const abs = new Pariah({
      baseUrl: "https://companyenrichment.abstractapi.com/",
    });
    const company = await abs.getJSON<AbstractCompany>(
      `/v1/${abs.toUrlParams({
        api_key: Secrets.AbstractKeys.COMPANY_ENRICHMENT,
        domain: args.domain,
      })}`
    );
    if (!company.domain) throw new Err("no results found");
    const embed = createBrandEmbed(Brand.ABSTRACT, context);
    embed.setTitle(`Company Enrichment for ${company.domain}`);
    {
      const description: Array<string> = [];
      description.push(`**Name**: ${company.name}`);
      description.push(`**Domain**: ${company.domain}`);
      description.push(`**Year Founded**: ${company.year_founded}`);
      description.push(`\n**Industry**: ${company.industry}`);
      description.push(`**Employee Count**: ${company.employees_count}`);
      description.push(`\n**Locality**: ${company.locality}`);
      description.push(`**Country**: ${company.country}`);
      if (company.linkedin_url) {
        description.push(
          `\n**LinkedIn URL**: [${company.name}](https://${company.linkedin_url})`
        );
      }

      embed.setDescription(description.join("\n"));
    }
    return context.editOrReply({ embed });
  }
}
