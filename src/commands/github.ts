import { MessageEmbed } from "discord.js";
import { api } from "../functions/api";
import { formatTimestamp } from "../functions/formatTimestamp";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { BaseUrls, Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";
import { CustomEmojis } from "../maps/customEmojis";
import { decor } from "../maps/emojiEnum";
module.exports = {
  name: "github",
  description: "get github info lol",
  async run(message, args) {
    const fn = args[0]?.toLowerCase();
    const search = args[1] ? args.slice(1).join(" ") : false;
    if (!search) return await message.reply("you need to search for something");
    switch (fn) {
      case "user":
        const uURL = BaseUrls.GitHub + "users/" + search;
        const ugAPI = await api(uURL, "json");
        if (ugAPI.message == "Not Found")
          return await message.reply("not found");
        const uEmb = new MessageEmbed();
        const company = ugAPI.company
          ? `\n${decor.Emojis.CLASSICAL_BUILDING} **Company**: \`${ugAPI.company}\``
          : "";
        const blog = ugAPI.blog
          ? `\n${decor.Emojis.MEMO} **Blog**: [\`Here\`](${ugAPI.blog})`
          : "";
        const location = ugAPI.location
          ? `\n${decor.Emojis.HOUSE} **Location**: \`${ugAPI.location}\``
          : "";
        const twitter = ugAPI.twitter_username
          ? `\n${decor.Emojis.BIRD} **Twitter**: [\`@${ugAPI.twitter_username}\`](https://twitter.com/${ugAPI.twitter_username})`
          : "";

        const counts = [
          `${decor.Emojis.HOMES} **Repositories**: ${ugAPI.public_repos}`,
          `${decor.Emojis.MEMO} **Gists**: ${ugAPI.public_gists}`,
          `${decor.Emojis.INBOX_TRAY} **Followers**: ${ugAPI.followers}`,
          `${decor.Emojis.PACKAGE} **Following**: ${ugAPI.following}`,
        ];
        uEmb.setTitle(`Info for GitHub user ${ugAPI.login}`);
        uEmb.setThumbnail(ugAPI.avatar_url);

        uEmb.setDescription(ugAPI.bio ?? "No bio");
        const created = new Date(ugAPI.created_at);
        uEmb.addField(
          `❯ User Info`,
          `${decor.Emojis.GEAR} **ID**: \`${ugAPI.id}\`
${decor.Emojis.LINK} **Profile**: [${ugAPI.name}](${ugAPI.html_url})
${decor.Emojis.CALENDAR_SPIRAL} **Created At**: ${simpleGetLongAgo(
            +created
          )} ${formatTimestamp(created)}`
        );
        if (company || location || blog || twitter)
          uEmb.addField(
            "❯ Other Info",
            `${company}${location}${blog}${twitter}`
          );
        if (counts.length) uEmb.addField("❯ Counts", `${counts.join("\n")}`);
        uEmb.setColor(Color.embed);
        await message.reply(uEmb);
        break;
      case "repo":
        const rURL = BaseUrls.GitHub + "repos/" + search;
        const rgAPI = await api(rURL, "json");
        if (rgAPI.message == "Not Found")
          return await message.reply("not found");
        const rEmb = new MessageEmbed();
        rEmb.setTitle(`Info for GitHub repo ${rgAPI.name}`);
        const rcreated = new Date(rgAPI.created_at);
        rEmb.setDescription(rgAPI.description ?? "No bio");
        rEmb.addField(
          `❯ Repo Info`,
          `${decor.Emojis.GEAR} **ID**: \`${rgAPI.id}\`
${decor.Emojis.LINK} **Profile**: [${rgAPI.full_name}](${rgAPI.html_url})
${decor.Emojis.CALENDAR_SPIRAL} **Created At**: ${simpleGetLongAgo(
            +rcreated
          )} ${formatTimestamp(rcreated)}
${decor.Emojis.SPEECH_LEFT} **Main Language**: ${rgAPI.language ?? `Unknown`}
${CustomEmojis.GUI_OWNERCROWN} **Owned By**: [\`${rgAPI.owner.login}\`](${
            rgAPI.owner.html_url
          })`
        );
        const lUpdated = new Date(rgAPI.updated_at);
        const lPushed = new Date(rgAPI.pushed_at);

        rEmb.addField(
          "❯ Other Info",
          `${decor.Emojis.TIMER} **Last Updated**: ${simpleGetLongAgo(
            +lUpdated
          )} ${formatTimestamp(lUpdated)}
${decor.Emojis.OUTBOX_TRAY} **Last Pushed**: ${simpleGetLongAgo(
            +lPushed
          )} ${formatTimestamp(lPushed)}
${CustomEmojis.CHANNEL_CATEGORY} **Default Branch**: \`${
            rgAPI.default_branch
          }\``
        );
        rEmb.addField(
          "❯ Stats",
          `${decor.Emojis.STAR} **Stars**: ${rgAPI.stargazers_count}
          ${decor.Emojis.EYES} **Watchers**: ${rgAPI.watchers_count}
          ${decor.Emojis.WARNING} **Issues**: ${rgAPI.open_issues_count}
          ${decor.Emojis.TWISTED_RIGHTWARDS_ARROWS} **Forks**: ${rgAPI.forks}
          ${decor.Emojis.PERSON_RAISING_HAND} **Subscribers**: ${rgAPI.subscribers_count}
          ${decor.Emojis._1234} **Size**: ${rgAPI.size}`
        );
        rEmb.setColor(Color.embed);
        await message.reply(rEmb);
        break;
      default:
        await message.reply(
          "invalid github type, valid types are `repo`, `user`"
        );
    }
  },
} as ICommand;
