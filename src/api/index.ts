import { Activity, GuildPreview, User } from "discord.js";
import express from "express";
import { client } from "..";
import { UserStatusMap } from "../enums/userStatus";
import { getGuildFeatures } from "../functions/getGuildFeatures";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { getProfileBadges } from "../functions/getProfileBadges";
import { search_guild } from "../functions/searching/guild";
import { search_user } from "../functions/searching/user";
import globalConf from "../globalConf";
import { messages } from "../messages";
export function runapi() {
  const app = express();
  const port = 4587;

  app.get("/", (_req, res) => {
    res.setHeader("content-type", "application/json");
    res.send("hi");
  });
  app.get("/guild", async (_req, res) => {
    res.setHeader("content-type", "application/json");
    if (!_req.query.query)
      return res.send({ error: "Missing 'query' argument" });
    const c = await search_guild((_req.query.query as string).toLowerCase());
    if (!c || c instanceof GuildPreview)
      return res.send({
        error: "❌ Guild not found",
      });

    res.send({
      id: c.id,
      name: c.name,
      owner: c.owner?.user.tag,
      features: getGuildFeatures(c).map((e) => e.text),
      assets: {
        icon: c.iconURL({ dynamic: true }),
        banner: c.bannerURL(),
        splash: c.splashURL(),
        discovery_splash: c.discoverySplashURL(),
      },
      bans:
        c.me && c.me.permissions.has("BAN_MEMBERS")
          ? (await c.fetchBans()).array().map((e) => e.user.tag)
          : null,
      age: {
        created_at: c.createdAt,
        since_now: `${simpleGetLongAgo(c.createdTimestamp)} ago`,
      },
    });
  });

  app.get("/known_guilds", async (_req, res) => {
    res.setHeader("content-type", "application/json");
    _req.query.query = _req.query.query ?? "760143615124439040";
    const c = await search_user((_req.query.query as string).toLowerCase());
    if (!c)
      return res.send({
        error: messages.targeting.not_found.user,
      });

    res.send(
      ((c: User) => {
        const object: any[] = [];
        client.guilds.cache
          .filter((e) => e.members.cache.has(c.id))
          .forEach((v) => {
            const member = v.members.cache.get(c.id)!;
            const o: any = {
              name: v.name,
              id: v.id,
              joined: v.joinedAt,
            };
            if (member.lastMessage)
              o["last_typing"] = {
                created_at: member.lastMessage!.createdAt,
                since_now: `${simpleGetLongAgo(
                  member.lastMessage!.createdTimestamp!
                )} ago`,
              };
            object.push(o);
          });
        return object;
      })(c)
    );
  });
  app.get("/user", async (_req, res) => {
    res.setHeader("content-type", "application/json");
    _req.query.query = _req.query.query ?? "760143615124439040";
    const c = await search_user((_req.query.query as string).toLowerCase());
    if (!c)
      return res.send({
        error: messages.targeting.not_found.user,
      });
    const formActivity = (e: Activity) => ({
      name: e.name,
      state: e.state,
      details: e.details,
      appID: e.applicationID,
      since: e.createdAt,
    });

    res.send({
      id: c.id,
      tag: c.tag,
      age: {
        created_at: c.createdAt,
        since_now: `${simpleGetLongAgo(c.createdTimestamp)} ago`,
      },
      known_guilds: client.guilds.cache
        .filter((e) => e.members.cache.has(c.id))
        .map((e) => e.id),
      profile_badges: getProfileBadges(c, undefined, true),
      custom_badges: (globalConf.badges[c.id] ?? []).map((e) => e.text),
      presence: {
        status: UserStatusMap.get(c.presence.status)?.text,
        competing_in: c.presence.activities
          .filter((e) => e.type === "COMPETING")
          .map(formActivity),
        custom_status: c.presence.activities
          .filter((e) => e.type === "CUSTOM_STATUS")
          .map(formActivity),
        listening_to: c.presence.activities
          .filter((e) => e.type === "LISTENING")
          .map(formActivity),
        playing: c.presence.activities
          .filter((e) => e.type === "PLAYING")
          .map(formActivity),
        streaming_on: c.presence.activities
          .filter((e) => e.type === "STREAMING")
          .map(formActivity),
        watching: c.presence.activities
          .filter((e) => e.type === "WATCHING")
          .map(formActivity),
      },
    });
  });

  app.listen(port, () => {});
}
