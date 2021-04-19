import { Activity, User } from "discord.js";
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
    if (!c)
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
  app.get("/user", async (_req, res) => {
    res.setHeader("content-type", "application/json");
    if (!_req.query.query)
      return res.send({ error: "Missing 'query' argument" });
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
      known_guilds: ((c: User) => {
        const object: { [a: string]: any } = {};
        client.guilds.cache
          .filter((e) => e.members.cache.has(c.id))
          .forEach((v) => {
            object[v.id] = v.name;
          });
        return object;
      })(c),
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
