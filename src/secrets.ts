import { config } from "dotenv";
config();
const env = process.env;

export const Secrets = {
  BOT_TOKEN: env.TOKEN!,
  AltTokens: [],
  UserToken: env.USER_TOKEN!,
  Key: {
    wolframAlpha: env.WOLFRAM_ALPHA_API_KEY!,
    pxlAPI: env.PXL_API_KEY!,
    imaggaAuth: env.IMAGGA_API_KEY!,
    pylon: env.PYLON_API_KEY!,
    openAI: env.OPENAI_API_KEY!,
  },
  AbstractKeys: {
    HOLIDAYS: env.ABSTRACT_HOLIDAYS_KEY!,
    TIMEZONE: env.ABSTRACT_TIMEZONE_KEY!,
    PHONE_VALIDATION: env.ABSTRACT_PHONE_VALIDATION_KEY!,
    COMPANY_ENRICHMENT: env.ABSTRACT_COMPANY_ENRICHMENT_KEY!,
    IP_GEOLOCATION: env.ABSTRACT_IP_GEOLOCATION_KEY!,
    EMAIL_VALIDATION: env.ABSTRACT_EMAIL_VALIDATION_KEY!,
    EXCHANGE_RATES: env.ABSTRACT_EXCHANGE_RATES_KEY!,
  },
};
