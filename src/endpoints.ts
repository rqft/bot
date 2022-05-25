export module VyboseEndpoints {
  export const CUSTOM = {
    STEAM_EMOJI: (name: string): string =>
      `https://steamcommunity-a.akamaihd.net/economy/emoticon/${name}`,
    TWEMOJI_SVG: (codepoint: string) =>
      `https://cdn.notsobot.com/twemoji/512x512/${codepoint}.png`,
  };
}
