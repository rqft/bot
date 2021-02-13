export const config = {
  global: {
    keys: {
      wolframAlpha: "AHE6V9-WHRE7W64PX",
    },
    guildId: "775743191441735712",
    locale: "en-US",
    timezone: "America/Chicago",
    sexAlarm: [
      "752675935249105086", // #spam-channel in The Gronos Public
      "807056248679039047", // #seggs in Arcs' Dev Place
    ],
    logs: ["807386023565983754"],
  },
  voice: {
    broadcastUrl:
      "https://audio.ngfiles.com/714000/714356_Lycanthropy-Original-Mix.mp3",
  },
  bot: {
    prefixes: ["\\$", "p\\/", "<@!?760143615124439040>"],
    id: "760143615124439040",
    token: "NzYwMTQzNjE1MTI0NDM5MDQw.X3Hw6A.m20I8OXPRGfHXUdX28IZuf5VXp8",
    application: {
      ownerId: "504698587221852172",
      clientId: "760143615124439040",
      publicKey:
        "3667c73b9600c708d5b7e2fdd25e48351510554845216a7086976e0848813a10",
    },
    ownerIds: [
      "533757461706964993", // insyri
      "504698587221852172", // me
    ],
    presence: {
      activity: {
        name: "$",
        type: "STREAMING",
        url:
          "https://www.youtube.com/watch?v=db_sYdSPD24&ab_channel=FalseNoise-Topic",
      },
      browser: "Discord iOS",
      voiceChannel: "801547371728338975",
    },
  },
  logs: {
    starts: {
      keys: ["800439411036520459"],
    },
    commands: {
      usage: {
        keys: ["800561781302362124"],
      },
      onError: {
        keys: ["800561781302362124"],
      },
    },
    blacklist: {
      userBlocked: ["800561781302362124"],
      guildBlocked: ["800561781302362124"],
      guildOwnerBlocked: ["800561781302362124"],
    },
  },
  blacklist: {
    guild: {
      owners: ["606162661184372736"],
      ids: [] as string[],
    },
    users: ["606162661184372736"],
  },
};
