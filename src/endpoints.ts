export module VyboseEndpoints {
  export const CUSTOM = {
    STEAM_EMOJI: (name: string): string =>
      `https://steamcommunity-a.akamaihd.net/economy/emoticon/${name}`,
    TWEMOJI_SVG: (codepoint: string) =>
      `https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/${codepoint}.svg`,
  };
}
