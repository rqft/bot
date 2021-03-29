import { Collection, Invite, MessageEmbed } from "discord.js";
import { client } from "../..";
import { CustomEmojis } from "../../enums/customEmojis";
import { simpleGetLongAgo } from "../../functions/getLongAgo";
import { replacer } from "../../functions/replacer";
import { Chars, Color } from "../../globals";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "invite",
  args: [
    {
      name: "code",
      required: false,
      type: "Invite",
    },
  ],
  async run(message, args) {
    var invite: Invite | null = null;
    try {
      invite = await client.fetchInvite(
        args[0]! ??
          (await message.guild?.fetchInvites())
            ?.array()
            .sort(
              (a, b) =>
                (b.createdTimestamp ?? Date.now()) -
                (a.createdTimestamp ?? Date.now())
            )[0]
      );
    } catch {
      return await message.reply(messages.commands.other.invite.invalid_invite);
    }
    if (!invite)
      return await message.reply(
        replacer(messages.commands.other.invite.unknown_invite, [
          ["{CODE}", args[0]],
        ])
      );
    const baseMembers = {
      members: invite.memberCount,
      online: invite.presenceCount,
    };
    var find = (await message.guild?.fetchInvites())!.find(
      (e) => e.code == invite!.code
    );
    if (find) invite = find;
    if (!invite) return await message.reply("?");
    const emb = new MessageEmbed();
    emb.setAuthor(
      invite.guild!.name,
      invite.guild!.iconURL({ dynamic: true })!
    );
    emb.setThumbnail(invite.guild!.iconURL({ dynamic: true })!);
    emb.setTitle(`Invite "${invite.code}"`);
    emb.setURL(invite.url);
    const msgs = [];
    if (invite.channel)
      msgs.push(
        replacer(messages.commands.other.invite.channel, [
          [
            "{CHANNEL}",
            `${invite.channel.toString()} **[**\`${invite.channel.id}\`**]**`,
          ],
        ])
      );
    if (invite.createdTimestamp !== null)
      msgs.push(
        replacer(messages.commands.other.invite.created, [
          [
            "{CREATED}",
            simpleGetLongAgo(invite.createdTimestamp ?? Date.now() - 1000),
          ],
        ])
      );
    if (invite.uses)
      msgs.push(
        replacer(messages.commands.other.invite.uses, [
          ["{USES}", invite.uses],
          ["{USES_MAX}", invite.maxUses ?? Chars.INFINITY],
        ])
      );
    if (invite.expiresTimestamp)
      msgs.push(
        replacer(messages.commands.other.invite.expires_in, [
          [
            "{EXPIRY}",
            simpleGetLongAgo(
              Date.now() - (invite.expiresTimestamp - Date.now())
            ),
          ],
        ])
      );
    if (invite.inviter)
      msgs.push(
        replacer(messages.commands.other.invite.inviter, [
          [
            "{USER}",
            `${invite.inviter.toString()} **[**\`${invite.inviter.id}\`**]**`,
          ],
        ])
      );
    emb.addField(
      "Invite Stats",
      msgs.length ? msgs.join("\n") : messages.commands.other.invite.no_stats
    );

    if (invite.guild) {
      var otherInvs = new Collection<string, Invite>();
      try {
        otherInvs = await invite.guild!.fetchInvites();
      } catch {}
      if (otherInvs.size)
        emb.addField(
          "Other Invites",
          `${(await invite.guild.fetchInvites())
            .array()
            .map((e) => `[\`${e.code}\`](${e.url})`)
            .slice(0, 8)
            .join(" ")}`
        );
    }
    emb.addField(
      "Members",
      `${CustomEmojis.STATUS_OFFLINE} ${baseMembers.members} Members ${CustomEmojis.STATUS_ONLINE} ${baseMembers.online} Online`
    );
    emb.setColor(Color.embed);
    await message.reply(emb);
  },
} as ICommand;
