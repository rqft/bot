import { VoiceConnection } from "detritus-client/lib/media/voiceconnection";
import {
  Application,
  Channel,
  Emoji,
  Guild,
  Member,
  Message,
  Presence,
  Relationship,
  Role,
  Session,
  Typing,
  User,
  VoiceCall,
  VoiceState,
} from "detritus-client/lib/structures";
import { client } from "..";
import private_guilds from "../config/private_guilds";
import { altclients, selfclient } from "../globals";
export type AllowedCollectorKeys =
  | "applications"
  | "channels"
  | "emojis"
  | "guilds"
  | "members"
  | "messages"
  | "notes"
  | "presences"
  | "relationships"
  | "roles"
  | "sessions"
  | "typings"
  | "users"
  | "voiceCalls"
  | "voiceConnections"
  | "voiceStates";
export type AllowedCollection =
  | string
  | Application
  | Channel
  | Emoji
  | Guild
  | Member
  | Message
  | Presence
  | Relationship
  | Role
  | Session
  | Typing
  | User
  | VoiceCall
  | VoiceConnection
  | VoiceState;
export const getCollectiveGuilds = () =>
  rmKey(
    [client, selfclient, ...altclients]
      .map((v) =>
        v.guilds.toArray().filter((v) => !private_guilds.includes(v.id))
      )
      .flat(1),
    "id"
  );

export const getCollectiveUsers = () =>
  rmKey(
    [client, selfclient, ...altclients].map((v) => v.users.toArray()).flat(1),
    "id"
  );
export const getCollectiveRoles = () =>
  rmKey(
    [client, selfclient, ...altclients].map((v) => v.roles.toArray()).flat(1),
    "id"
  );
export const getCollectiveEmojis = () =>
  rmKey(
    [client, selfclient, ...altclients].map((v) => v.emojis.toArray()).flat(1),
    "id"
  );
export const getCollectiveVoiceStates = () =>
  rmKey(
    [client, selfclient, ...altclients]
      .map((v) => v.voiceStates.toArray())
      .flat(),
    "sessionId"
  );
export const getCollectiveMessages = () =>
  rmKey(
    [client, selfclient, ...altclients]
      .map((v) => v.messages.toArray())
      .flat(1),
    "id"
  );
export const getCollectiveChannels = () =>
  rmKey(
    [client, selfclient, ...altclients]
      .map((v) => v.channels.toArray())
      .flat(1),
    "id"
  );
export const getCollectiveApplications = () =>
  rmKey(
    [client, selfclient, ...altclients]
      .map((v) => v.applications.toArray())
      .flat(1),
    "id"
  );
export const getCollectors = () => [client, selfclient, ...altclients];
export const getCollectiveAny = (
  key: AllowedCollectorKeys,
  remove?: string
): AllowedCollection[] =>
  rmKey(
    [client, selfclient, ...altclients].map((v) => v[key].toArray()).flat(1),
    remove ?? ""
  );
const rmKey = <T>(array: Array<T>, key: string | number) =>
  // @ts-ignore
  array.filter((v, i, a) => a.findIndex((t) => t[key] === v[key]) === i);
