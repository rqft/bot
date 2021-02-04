import {
  DefaultMessageNotifications,
  ExplicitContentFilterLevel,
  GuildChannel,
  GuildChannelManager,
  GuildEmojiManager,
  GuildFeatures,
  GuildMember,
  GuildMemberManager,
  PremiumTier,
  PresenceManager,
  RoleManager,
  Snowflake,
  SystemChannelFlags,
  TextChannel,
  VerificationLevel,
  VoiceChannel,
  VoiceState,
  VoiceStateManager,
  WebSocketShard,
} from "discord.js";

export interface Server {
  afkChannel?: VoiceChannel | null;
  afkChannelID?: Snowflake | null;
  afkTimeout?: number;
  applicationID?: Snowflake | null;
  approximateMemberCount?: number | null;
  approximatePresenceCount?: number | null;
  available?: boolean;
  banner?: string | null;
  channels?: GuildChannelManager;
  createdAt?: Date;
  createdTimestamp?: number;
  defaultMessageNotifications?: DefaultMessageNotifications | number;
  deleted?: boolean;
  description?: string | null;
  discoverySplash?: string | null;
  embedChannel?: GuildChannel | null;
  embedChannelID?: Snowflake | null;
  embedEnabled?: boolean;
  emojis?: GuildEmojiManager;
  explicitContentFilter?: ExplicitContentFilterLevel;
  features?: GuildFeatures[];
  icon?: string | null;
  id?: Snowflake;
  joinedAt?: Date;
  joinedTimestamp?: number;
  large?: boolean;
  maximumMembers?: number | null;
  maximumPresences?: number | null;
  me?: GuildMember | null;
  memberCount?: number;
  members?: GuildMemberManager;
  mfaLevel?: number;
  name?: string;
  nameAcronym?: string;
  owner?: GuildMember | null;
  ownerID?: Snowflake;
  partnered?: boolean;
  preferredLocale?: string;
  premiumSubscriptionCount?: number | null;
  premiumTier?: PremiumTier;
  presences?: PresenceManager;
  publicUpdatesChannel?: TextChannel | null;
  publicUpdatesChannelID?: Snowflake | null;
  region?: string;
  roles?: RoleManager;
  rulesChannel?: TextChannel | null;
  rulesChannelID?: Snowflake | null;
  shard?: WebSocketShard;
  shardID?: number;
  splash?: string | null;
  systemChannel?: TextChannel | null;
  systemChannelFlags?: Readonly<SystemChannelFlags>;
  systemChannelID?: Snowflake | null;
  vanityURLCode?: string | null;
  vanityURLUses?: number | null;
  verificationLevel?: VerificationLevel;
  verified?: boolean;
  voice?: VoiceState | null;
  voiceStates?: VoiceStateManager;
  widgetChannel?: TextChannel | null;
  widgetChannelID?: Snowflake | null;
  widgetEnabled?: boolean | null;
}
const a: Server = {};
a;
