import { Command, CommandClient } from "detritus-client";
import { Pariah } from "pariah/dist";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Err } from "../../../functions/error";
import { editOrReply } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ToolsMetadata } from "../basecommand";
export interface AbstractCompanyEnrichmentArgs {
  domain: string;
}
export interface AbstractCompany {
  name: string | null;
  domain: string;
  year_founded: number | null;
  industry: string | null;
  employees_count: number | null;
  locality: string | null;
  country: string | null;
  linkedin_url?: string | null;
}
export default class AbstractCompanyEnrichmentCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "company-enrichment",
      aliases: ["company"],

      label: "domain",
      type: "string",
      required: true,
      metadata: ToolsMetadata(
        "Get Company Enrichment data for a domain",
        "<domain: URL>",
        ["google.com", "https://discard.cc/"]
      ),
    });
  }
  async run(context: Command.Context, args: AbstractCompanyEnrichmentArgs) {
    const abs = new Pariah(
      new URL("https://companyenrichment.abstractapi.com/")
    );
    const company = await abs.get.json<AbstractCompany>(`/v1/`, {
      api_key: Secrets.AbstractKeys.COMPANY_ENRICHMENT,
      domain: args.domain,
    });
    if (!company.domain) throw new Err("No results found", { status: 404 });
    const embed = createBrandEmbed(Brand.ABSTRACT, context);
    embed.setTitle(`Company Enrichment for ${company.domain}`);
    {
      const description: Array<string> = [];
      if (company.name) description.push(`**Name**: ${company.name}`);
      description.push(`**Domain**: ${company.domain}`);
      if (company.year_founded)
        description.push(`**Year Founded**: ${company.year_founded}`);
      if (company.industry)
        description.push(`\n**Industry**: ${company.industry}`);
      if (company.employees_count)
        description.push(`**Employee Count**: ${company.employees_count}`);
      if (company.locality)
        description.push(`\n**Locality**: ${company.locality}`);
      if (company.country) description.push(`**Country**: ${company.country}`);
      if (company.linkedin_url) {
        description.push(
          `\n**LinkedIn URL**: [${company.name}](https://${company.linkedin_url})`
        );
      }

      embed.setDescription(description.join("\n"));
    }
    return editOrReply(context, { embed });
  }
}
