import { messages } from "./messages";

export const config = {
  client: {
    interactions: {
      guildIds: [
        "816362327678779392",
        "760130247580057650",
        "759174794968301569",
      ],
      global: false,
    },
  },
  markers: {
    users: [] as Array<string>,
    guilds: [] as Array<string>,
  },
  locale: "en" as keyof typeof messages,
};
//
