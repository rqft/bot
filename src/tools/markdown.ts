export namespace Markdown {
  /**
   * An enumeration of all the valid Discord timestamp styles.
   */

  export enum TimestampStyles {
    BothLong = 'F',
    BothShort = 'f',
    DateLong = 'D',
    DateShort = 'd',
    Relative = 'R',
    TimeLong = 'T',
    TimeShort = 't',
  }

  /**
   * Utility to cut messages by bytes and not characters
   */

  export function trueSlice(text: string, limit?: number): string {
    if (limit) {
      return new TextDecoder().decode(
        new TextEncoder().encode(text).slice(0, limit)
      );
    }
    return text;
  }

  /**
   * Object that holds all the Discord Markup identifiers.
   */

  export const Strings = {
    BOLD: '**',
    CODEBLOCK: '```',
    CODESTRING: '`',
    CODESTRING_DOUBLE: '``',
    ESCAPE: '\\',
    ITALICS: '_',
    SPOILER: '||',
    STRIKE: '~~',
    UNDERLINE: '__',
  };

  /**
   * Object that maps all the Discord Markup identifiers to their respective RegExp matchers.
   */

  const Regexes = {
    [Strings.BOLD]: /\*\*/g,
    [Strings.CODEBLOCK]: new RegExp(Strings.CODEBLOCK, 'g'),
    [Strings.CODESTRING]: new RegExp(Strings.CODESTRING, 'g'),
    [Strings.ESCAPE]: /\\/g,
    [Strings.ITALICS]: /(_|\*)/g,
    [Strings.SPOILER]: /\|\|/g,
    [Strings.STRIKE]: new RegExp(Strings.STRIKE, 'g'),
    [Strings.UNDERLINE]: new RegExp(Strings.UNDERLINE, 'g'),
    EVERYONE: /@(everyone|here)/g,
    LINK: /\]\(/g,
    MENTION: /<@([!&]?[0-9]{16,21})>/g,
    MENTION_HARDCORE: /@/g,
    URL: /\)/g,
  };

  /**
   * Object to replace Discord Markup identifiers with when escaping strings.
   */

  const Replacements = {
    [Strings.BOLD]: '\\*\\*',
    [Strings.CODEBLOCK]: '``\u200b`',
    [Strings.CODESTRING]: '\\`',
    [Strings.ESCAPE]: '\\\\',
    [Strings.ITALICS]: '\\$1',
    [Strings.SPOILER]: '\\|\\|',
    [Strings.STRIKE]: '\\~\\~',
    [Strings.UNDERLINE]: '\\_\\_',
    MENTION: '\u200b',
  };
  /**
   * Utility to escape some Discord Markup Identifier
   */
  export function EscapeBasic(raw: string, key: keyof typeof Strings): string {
    return raw.replace(Regexes[key] || '', Replacements[key] || '');
  }
  /**
   * Object of all the Escape functions used to apply mixed markup
   */
  export const Escape: Record<keyof typeof Strings, typeof EscapeBasic> = (
    Object.keys(Strings) as Array<keyof typeof Strings>
  ).reduce(
    (p, v) => Object.assign(p, { [v]: (raw: string) => EscapeBasic(raw, v) }),
    {} as Record<string, typeof EscapeBasic>
  );
  /**
   * String formatting for freezing Discord timestamps that have the Relative (R) flag
   */
  const FrozenTimestampStyles: Record<TimestampStyles, string> = {
    [TimestampStyles.BothLong]:
      '{day}, {month} {date}, {year} {hour}:{minute} {meridian}',
    [TimestampStyles.BothShort]:
      '{month} {date}, {year} {hour}:{minute} {meridian}',
    [TimestampStyles.DateLong]: '{month} {date}, {year}',
    [TimestampStyles.DateShort]: '{month_short}/{date}/{year}',
    [TimestampStyles.Relative]: '{relative}',
    [TimestampStyles.TimeLong]: '{hour}:{minute}:{second} {meridian}',
    [TimestampStyles.TimeShort]: '{hour}:{minute} {meridian}',
  };
  /**
   * Holds metadata and string conversions of a UNIX Timestamp
   */
  interface Timestamp {
    raw: number;
    month: string;
    monthShort: string;
    date: string;
    year: string;
    second: string;
    meridian: 'AM' | 'PM';
    hour: string;
    minute: string;
    day: string;
    relative: string;
  }
  /**
   * Converter for number to Days of the Week
   */
  const Days: Record<number, string> = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };

  /**
   * Converter for number to Months of the Year
   */

  const Months: Record<number, string> = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };

  /**
   * Converts a Date object to a Timestamp object
   */

  export function formatDate(date: Date): Timestamp {
    return {
      relative: toTimeString(date.getTime(), TimestampUnits),
      raw: date.getTime(),
      date: date.getDate().toString().padStart(2, '0'),
      day: Days[date.getDay()] || '',
      hour: date.getHours().toString().padStart(2, '0'),
      meridian: date.getHours() > 12 ? 'PM' : 'AM',
      minute: date.getMinutes().toString().padStart(2, '0'),
      month: Months[date.getMonth()] || '',
      monthShort: (date.getMonth() + 1).toString().padStart(2, '0'),
      second: date.getSeconds().toString().padStart(2, '0'),
      year: date.getFullYear().toString(),
    };
  }

  /**
   * Collectively multiplies bigints together
   */

  export function multiplyLarge(...nums: Array<bigint | number>): bigint {
    return nums.map(BigInt).reduce((p, v) => (p *= v), 1n);
  }

  /**
   * Get the absolute value of a bigint
   */

  export function bigintAbs(int: bigint): bigint {
    if (int < 0) return -int;
    return int;
  }

  /**
   * Object of Units matched with their string representations.
   */

  const TimestampUnits = {
    myriad: multiplyLarge(10, 10, 10, 10, 12, 4, 7, 24, 60, 1000),
    millenium: multiplyLarge(10, 10, 10, 12, 4, 7, 24, 60, 1000),
    century: multiplyLarge(10, 10, 12, 4, 7, 24, 60, 1000),
    decade: multiplyLarge(10, 12, 4, 7, 24, 60, 60, 1000),
    year: multiplyLarge(12, 4, 7, 24, 60, 60, 1000),
    month: multiplyLarge(4, 7, 24, 60, 60, 1000),
    week: multiplyLarge(7, 24, 60, 60, 1000),
    day: multiplyLarge(24, 60, 60, 1000),
    hour: multiplyLarge(60, 60, 1000),
    minute: multiplyLarge(60, 1000),
    second: multiplyLarge(1000),
    millisecond: multiplyLarge(1),
  };
  /**
   * Utility type. Used to force Object.entries to allow non-strings.
   */
  type ObjectEntries<K, V> = Array<[K, V]>;
  /**
   * Converts a UNIX timestamp to a Relative String
   */
  export function toTimeString<T extends number | string | symbol>(
    unix: bigint | number,
    units = TimestampUnits,
    isFromNow = false,
    limit?: number
  ): string {
    if (typeof unix === 'number') unix = BigInt(unix);

    if (isFromNow) unix = bigintAbs(unix - BigInt(Date.now()));
    if (unix === 0n) return '0 milliseconds';

    const formatted: Map<T, number> = new Map();
    const unitList = Object.entries(units) as ObjectEntries<T, bigint>;
    let run = unix;

    for (const [unit, value] of unitList) {
      if (run < value) continue;
      const runs = run / value + 1n;

      for (let loop = 0; loop <= runs; loop++) {
        if (run < value) break;
        const item = formatted.get(unit);

        if (item) formatted.set(unit, item + 1);
        else formatted.set(unit, 1);

        run -= value;
      }
    }
    let returned: Array<string> = [];
    for (const [key, value] of formatted) {
      const unit = String(key) + (value === 1 ? '' : 's');
      returned.push(`${value} ${unit}`);
    }
    if (limit !== undefined) {
      returned = returned.slice(0, limit);
    }
    return returned.join(', ');
  }
  /**
   * Freezes a UNIX timestamp into some time string based on the Timestamp Style
   */
  export function freezeUnix(unix: number, style: TimestampStyles): string {
    const date = new Date(unix);
    const timestamp = formatDate(date);
    let ret = FrozenTimestampStyles[style];
    for (const [key, value] of Object.entries(timestamp)) {
      ret = ret.split(`{${key}}`).join(value);
    }
    return ret;
  }
  /**
   * Instanced Class for formatting strings into their Markup variants
   */
  class FormatInner {
    public raw: string;
    public static: typeof FormatInner = FormatInner;
    constructor(raw: FormatInner | string) {
      if (raw instanceof FormatInner) {
        raw = raw.raw;
      }
      this.raw = raw;
    }
    toString(): string {
      return this.raw;
    }
    valueOf(): string {
      return this.raw;
    }
    italics(): FormatInner {
      return this.build('ITALICS', this.raw);
    }
    bold(): FormatInner {
      return this.build('BOLD', this.raw);
    }
    codestring(): FormatInner {
      const useDouble = this.raw.includes(Strings.CODESTRING);
      if (useDouble) {
        return this.codestringDouble();
      }
      return this.codestringSingle();
    }
    codestringDouble(): FormatInner {
      return this.build('CODESTRING_DOUBLE', this.raw);
    }
    codestringSingle(): FormatInner {
      return this.build('CODESTRING', this.raw);
    }
    codeblock(language?: string): FormatInner {
      let full = '';
      if (language) {
        full += language + '\n';
      }
      full += this.raw;
      return this.build('CODEBLOCK', full);
    }
    spoiler(): FormatInner {
      return this.build('SPOILER', this.raw);
    }
    strike(): FormatInner {
      return this.build('STRIKE', this.raw);
    }
    underline(): FormatInner {
      return this.build('UNDERLINE', this.raw);
    }

    build(key: keyof typeof Strings, w: string): FormatInner {
      const escaped = Escape[key](w, key);
      const ret = this.static.wrap(escaped, Strings[key]);
      return new this.static(ret);
    }
    static wrap(raw: string, what: string): string {
      return `${what}${raw}${what}`;
    }
    [Symbol.toStringTag](): string {
      return this.toString();
    }
  }
  /**
   * Formats strings into their Markup Variants
   */
  export class Format extends FormatInner {
    static bold(text: string): FormatInner {
      return new this(text).bold();
    }
    static build(text: string, key: keyof typeof Strings): FormatInner {
      return new this(text).build(key, text);
    }
    static codeblock(text: string, language?: string): FormatInner {
      return new this(text).codeblock(language);
    }
    static codestring(text: string): FormatInner {
      return new this(text).codestring();
    }
    static codestringSingle(text: string): FormatInner {
      return new this(text).codestringSingle();
    }
    static codestringDouble(text: string): FormatInner {
      return new this(text).codestringDouble();
    }
    static italics(text: string): FormatInner {
      return new this(text).italics();
    }
    static spoiler(text: string): FormatInner {
      return new this(text).spoiler();
    }
    static strike(text: string): FormatInner {
      return new this(text).strike();
    }
    static underline(text: string): FormatInner {
      return new this(text).underline();
    }
    static timestamp(
      unix: Date | number | string,
      format: TimestampStyles = TimestampStyles.BothShort,
      isSeconds = false
    ): FormatInner {
      if (typeof unix === 'string') unix = Number(unix);
      if (unix instanceof Date) unix = unix.getTime();

      if (!isSeconds) {
        unix /= 1000;
      }
      unix = Math.floor(unix);
      return new this(`<t:${unix}:${format}>`);
    }
    static date(
      unix: Date | number | string,
      format: TimestampStyles = TimestampStyles.BothShort,
      isSeconds = false
    ): FormatInner {
      if (typeof unix === 'string') unix = Number(unix);
      if (unix instanceof Date) unix = unix.getTime();

      if (isSeconds) {
        unix *= 1000;
      }
      return new this(freezeUnix(unix, format));
    }
    static link(text: string, url: URL | string): FormatInner {
      if (url instanceof URL) url = url.href;
      return new this(`[${text}](${url})`);
    }
  }
  /**
   * Enumeration of names used in the Matching process
   */
  export enum DiscordRegexNames {
    Emoji = 'EMOJI',
    JumpChannel = 'JUMP_CHANNEL',
    JumpChannelMessage = 'JUMP_CHANNEL_MESSAGE',
    MentionChannel = 'MENTION_CHANNEL',
    MentionRole = 'MENTION_ROLE',
    MentionUser = 'MENTION_USER',
    TextBold = 'TEXT_BOLD',
    TextCodeblock = 'TEXT_CODEBLOCK',
    TextCodestring = 'TEXT_CODESTRING',
    TextItalics = 'TEXT_ITALICS',
    TextSnowflake = 'TEXT_SNOWFLAKE',
    TextSpoiler = 'TEXT_SPOILER',
    TextStrike = 'TEXT_STRIKE',
    TextUnderline = 'TEXT_UNDERLINE',
    TextUrl = 'TEXT_URL',
  }

  /**
   * Mapping of Matching Names to their respective Regular Expressions
   */

  export const DiscordRegex = {
    [DiscordRegexNames.Emoji]: /<a?:(\w+):(\d+)>/g,
    [DiscordRegexNames.JumpChannel]:
      /^(?:https?):\/\/(?:(?:(?:canary|ptb)\.)?(?:discord|discordapp)\.com\/channels\/)(@me|\d+)\/(\d+)$/g,
    [DiscordRegexNames.JumpChannelMessage]:
      /^(?:https?):\/\/(?:(?:(?:canary|ptb)\.)?(?:discord|discordapp)\.com\/channels\/)(@me|\d+)\/(\d+)\/(\d+)$/g,
    [DiscordRegexNames.MentionChannel]: /<#(\d+)>/g,
    [DiscordRegexNames.MentionRole]: /<@&(\d+)>/g,
    [DiscordRegexNames.MentionUser]: /<@(!?)(\d+)>/g,
    [DiscordRegexNames.TextBold]: /\*\*([\s\S]+?)\*\*/g,
    [DiscordRegexNames.TextCodeblock]:
      /```(([a-z0-9-]+?)\n+)?\n*([^]+?)\n*```/gi,
    [DiscordRegexNames.TextCodestring]: /`([\s\S]+?)`/g,
    [DiscordRegexNames.TextItalics]: /_([\s\S]+?)_|\*([\s\S]+?)\*/g,
    [DiscordRegexNames.TextSnowflake]: /(\d+)/g,
    [DiscordRegexNames.TextSpoiler]: /\|\|([\s\S]+?)\|\|/g,
    [DiscordRegexNames.TextStrike]: /~~([\s\S]+?)~~(?!_)/g,
    [DiscordRegexNames.TextUnderline]: /__([\s\S]+?)__/g,
    [DiscordRegexNames.TextUrl]: /((?:https?):\/\/[^\s<]+[^<.,:;"'\]\s])/g,
  };

  /**
   * Object containing all the data from some Matching sequence
   */

  export interface DiscordRegexMatch {
    animated?: boolean;
    channelId?: string;
    guildId?: string;
    id?: string;
    language?: string;
    matched: string;
    mentionType?: string;
    messageId?: string;
    name?: string;
    text?: string;
    species: DiscordRegexNames;
  }

  /**
   * The result of a matched string.
   */

  export interface DiscordRegexPayload<T extends DiscordRegexMatch> {
    match: {
      regex: RegExp;
      type: string;
    };
    matches: Array<T>;
  }

  export interface EmojiMatch extends DiscordRegexMatch {
    name: string;
    id: string;
    animated: boolean;
    species: DiscordRegexNames.Emoji;
  }

  export interface JumpMatch extends DiscordRegexMatch {
    guildId: string;
    species:
      | DiscordRegexNames.JumpChannel
      | DiscordRegexNames.JumpChannelMessage;
  }

  export interface JumpChannelMatch extends JumpMatch {
    channelId: string;
    species: DiscordRegexNames.JumpChannel;
  }

  export interface JumpChannelMessageMatch extends JumpMatch {
    channelId: string;
    messageId: string;
    species: DiscordRegexNames.JumpChannelMessage;
  }

  export interface MentionableMatch extends DiscordRegexMatch {
    id: string;
    species:
      | DiscordRegexNames.MentionChannel
      | DiscordRegexNames.MentionRole
      | DiscordRegexNames.MentionUser;
  }

  export interface MentionChannelMatch extends MentionableMatch {
    species: DiscordRegexNames.MentionChannel;
  }

  export interface MentionRoleMatch extends MentionableMatch {
    species: DiscordRegexNames.MentionRole;
  }

  export interface MentionUserMatch extends MentionableMatch {
    mentionType: string;
    species: DiscordRegexNames.MentionUser;
  }

  export interface TextMatch extends DiscordRegexMatch {
    text: string;
    species:
      | DiscordRegexNames.TextBold
      | DiscordRegexNames.TextCodeblock
      | DiscordRegexNames.TextCodestring
      | DiscordRegexNames.TextItalics
      | DiscordRegexNames.TextSnowflake
      | DiscordRegexNames.TextSpoiler
      | DiscordRegexNames.TextStrike
      | DiscordRegexNames.TextUnderline
      | DiscordRegexNames.TextUrl;
  }

  export interface TextCodeblockMatch extends TextMatch {
    language: string;
    species: DiscordRegexNames.TextCodeblock;
  }
  export interface TextBoldMatch extends TextMatch {
    species: DiscordRegexNames.TextBold;
  }
  export interface TextCodestringMatch extends TextMatch {
    species: DiscordRegexNames.TextCodestring;
  }
  export interface TextItalicsMatch extends TextMatch {
    species: DiscordRegexNames.TextItalics;
  }
  export interface TextSnowflakeMatch extends TextMatch {
    species: DiscordRegexNames.TextSnowflake;
  }
  export interface TextSpoilerMatch extends TextMatch {
    species: DiscordRegexNames.TextSpoiler;
  }
  export interface TextStrikeMatch extends TextMatch {
    species: DiscordRegexNames.TextStrike;
  }
  export interface TextUnderlineMatch extends TextMatch {
    species: DiscordRegexNames.TextUnderline;
  }
  export interface TextUrlMatch extends TextMatch {
    species: DiscordRegexNames.TextUrl;
  }

  class MatchInner {
    public raw: string;
    public static: typeof MatchInner = MatchInner;

    constructor(raw: string) {
      this.raw = raw;
    }

    emoji(): DiscordRegexPayload<EmojiMatch> {
      return this.match(DiscordRegexNames.Emoji);
    }
    jumpChannel(): DiscordRegexPayload<JumpChannelMatch> {
      return this.match(DiscordRegexNames.JumpChannel);
    }
    jumpChannelMessage(): DiscordRegexPayload<JumpChannelMessageMatch> {
      return this.match(DiscordRegexNames.JumpChannelMessage);
    }
    mentionChannel(): DiscordRegexPayload<MentionChannelMatch> {
      return this.match(DiscordRegexNames.MentionChannel);
    }
    mentionRole(): DiscordRegexPayload<MentionRoleMatch> {
      return this.match(DiscordRegexNames.MentionRole);
    }
    mentionUser(): DiscordRegexPayload<MentionUserMatch> {
      return this.match(DiscordRegexNames.MentionUser);
    }
    codeblock(): DiscordRegexPayload<TextCodeblockMatch> {
      return this.match(DiscordRegexNames.TextCodeblock);
    }
    bold(): DiscordRegexPayload<TextBoldMatch> {
      return this.match(DiscordRegexNames.TextBold);
    }
    codestring(): DiscordRegexPayload<TextCodestringMatch> {
      return this.match(DiscordRegexNames.TextCodestring);
    }
    italics(): DiscordRegexPayload<TextItalicsMatch> {
      return this.match(DiscordRegexNames.TextItalics);
    }
    snowflake(): DiscordRegexPayload<TextSnowflakeMatch> {
      return this.match(DiscordRegexNames.TextSnowflake);
    }
    spoiler(): DiscordRegexPayload<TextSpoilerMatch> {
      return this.match(DiscordRegexNames.TextSpoiler);
    }
    strike(): DiscordRegexPayload<TextStrikeMatch> {
      return this.match(DiscordRegexNames.TextStrike);
    }
    underline(): DiscordRegexPayload<TextUnderlineMatch> {
      return this.match(DiscordRegexNames.TextUnderline);
    }
    url(): DiscordRegexPayload<TextUrlMatch> {
      return this.match(DiscordRegexNames.TextUrl);
    }

    match<T extends DiscordRegexMatch>(
      type: DiscordRegexNames,
      onlyFirst = false
    ): DiscordRegexPayload<T> {
      const regex: RegExp = DiscordRegex[type];
      // if (!regex) {
      //   throw new global.Error(`Unknown regex type: ${type}`);
      // }
      regex.lastIndex = 0;

      const payload: DiscordRegexPayload<T> = {
        match: { regex, type },
        matches: [],
      };

      let match: RegExpExecArray | null = null;
      while ((match = regex.exec(this.raw))) {
        const result: DiscordRegexMatch = {
          matched: match[0] || '',
          species: type,
        };
        switch (type) {
        case DiscordRegexNames.Emoji:
          {
            result.name = match[1] as string;
            result.id = match[2] as string;
            result.animated = this.raw.startsWith('<a:');
          }
          break;
        case DiscordRegexNames.JumpChannel:
          {
            result.guildId = match[1] as string;
            result.channelId = match[2] as string;
          }
          break;
        case DiscordRegexNames.JumpChannelMessage:
          {
            result.guildId = match[1] as string;
            result.channelId = match[2] as string;
            result.messageId = match[3] as string;
          }
          break;
        case DiscordRegexNames.MentionChannel:
        case DiscordRegexNames.MentionRole:
          {
            result.id = match[1] as string;
          }
          break;
        case DiscordRegexNames.MentionUser:
          {
            result.id = match[2] as string;
            result.mentionType = match[1] as string;
          }
          break;
        case DiscordRegexNames.TextCodeblock:
          {
            result.language = match[2] as string;
            result.text = match[3] as string;
          }
          break;
        case DiscordRegexNames.TextBold:
        case DiscordRegexNames.TextCodestring:
        case DiscordRegexNames.TextItalics:
        case DiscordRegexNames.TextSnowflake:
        case DiscordRegexNames.TextSpoiler:
        case DiscordRegexNames.TextStrike:
        case DiscordRegexNames.TextUnderline:
        case DiscordRegexNames.TextUrl:
          {
            result.text = match[1] as string;
          }
          break;
        default: {
          throw new global.Error(`Unknown regex type: ${type}`);
        }
        }
        payload.matches.push(result as T);

        if (onlyFirst) {
          break;
        }
      }
      regex.lastIndex = 0;
      return payload;
    }
  }
  export class Match extends MatchInner {
    static bold(raw: string): DiscordRegexPayload<TextBoldMatch> {
      return new this(raw).bold();
    }
    static codeblock(raw: string): DiscordRegexPayload<TextCodeblockMatch> {
      return new this(raw).codeblock();
    }
    static codestring(raw: string): DiscordRegexPayload<TextCodestringMatch> {
      return new this(raw).codestring();
    }
    static emoji(raw: string): DiscordRegexPayload<EmojiMatch> {
      return new this(raw).emoji();
    }
    static italics(raw: string): DiscordRegexPayload<TextItalicsMatch> {
      return new this(raw).italics();
    }
    static jumpChannel(raw: string): DiscordRegexPayload<JumpChannelMatch> {
      return new this(raw).jumpChannel();
    }
    static jumpChannelMessage(
      raw: string
    ): DiscordRegexPayload<JumpChannelMessageMatch> {
      return new this(raw).jumpChannelMessage();
    }
    static match(
      raw: string,
      what: DiscordRegexNames,
      onlyFirst = false
    ): DiscordRegexPayload<DiscordRegexMatch> {
      return new this(raw).match(what, onlyFirst);
    }
    static mentionChannel(
      raw: string
    ): DiscordRegexPayload<MentionChannelMatch> {
      return new this(raw).mentionChannel();
    }
    static mentionRole(raw: string): DiscordRegexPayload<MentionRoleMatch> {
      return new this(raw).mentionRole();
    }
    static mentionUser(raw: string): DiscordRegexPayload<MentionUserMatch> {
      return new this(raw).mentionUser();
    }
    static snowflake(raw: string): DiscordRegexPayload<TextSnowflakeMatch> {
      return new this(raw).snowflake();
    }
    static spoiler(raw: string): DiscordRegexPayload<TextSpoilerMatch> {
      return new this(raw).spoiler();
    }
    static strike(raw: string): DiscordRegexPayload<TextStrikeMatch> {
      return new this(raw).strike();
    }
    static underline(raw: string): DiscordRegexPayload<TextUnderlineMatch> {
      return new this(raw).underline();
    }
    static url(raw: string): DiscordRegexPayload<TextUrlMatch> {
      return new this(raw).url();
    }
  }
}
