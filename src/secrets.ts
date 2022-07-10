/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { config } from "dotenv";
config();
const env = process.env;

export const Secrets = {
  Token: env.TOKEN!,
  AltTokens: [],
  UserToken: env.USER_TOKEN!,
  Key: {
    WolframAlpha: env.WOLFRAM_ALPHA_API_KEY!,
    PxlAPI: env.PXL_API_KEY!,
    ImaggaAuth: env.IMAGGA_API_KEY!,
    Pylon: env.PYLON_API_KEY!,
    OpenAI: env.OPENAI_API_KEY!,
    HuggingFace: env.HUGGING_FACE_API_KEY!,
    EmojiData: env.EMOJI_DATA_API_KEY!,
    Google: {
      YouTubeData: env.GOOGLE_YOUTUBE_DATA_API_KEY!,
    },
    Spotify: env.SPOTIFY_API_KEY!.split(":") as [string, string],
  },
  AbstractKeys: {
    Holidays: env.ABSTRACT_HOLIDAYS_KEY!,
    Timezone: env.ABSTRACT_TIMEZONE_KEY!,
    PhoneValidation: env.ABSTRACT_PHONE_VALIDATION_KEY!,
    CompanyEnrichment: env.ABSTRACT_COMPANY_ENRICHMENT_KEY!,
    IpGeolocation: env.ABSTRACT_IP_GEOLOCATION_KEY!,
    EmailValidation: env.ABSTRACT_EMAIL_VALIDATION_KEY!,
    ExchangeRates: env.ABSTRACT_EXCHANGE_RATES_KEY!,
  },
  InteractionGuilds: [
    "248981745502781440",
    "759174794968301569",
    "816362327678779392",
    "941002690211766332",
    "760130247580057650",
  ],
  DefaultPrefix: env.DEFAULT_PREFIX!,
  ClearInteractions: false,
  StorageChannelId: "842855906508275713",
};
