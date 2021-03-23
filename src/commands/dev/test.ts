import { RoleData } from "discord.js";
import { Emojis } from "../../enums/emojis";
import { simpleGetLongAgo } from "../../functions/getLongAgo";
import { parseTimeString } from "../../functions/parseTimeString";
import { Color } from "../../globals";
import { ICommand } from "../../interfaces/ICommand";
export const overrides: { [any: string]: RoleData } = {
  adm: {
    name: "--ov-admin",
    permissions: "ADMINISTRATOR",
  },
  mngserver: {
    name: "--ov-manage-server",
    permissions: "MANAGE_GUILD",
  },
  mngchannels: {
    name: "--ov-manage-channels",
    permissions: "MANAGE_CHANNELS",
  },
  logs: {
    name: "--ov-logs",
    permissions: "VIEW_AUDIT_LOG",
  },
  roles: {
    name: "--ov-roles",
    permissions: "MANAGE_ROLES",
  },
  msgs: {
    name: "--ov-messages",
    permissions: "MANAGE_MESSAGES",
  },
  nick: {
    name: "--ov-nicknames",
    permissions: ["CHANGE_NICKNAME", "MANAGE_NICKNAMES"],
  },
  bans: {
    name: "--ov-bans",
    permissions: ["BAN_MEMBERS"],
  },
};
module.exports = {
  name: "ov",
  confirmation: {
    action: "roles.addAny",
    enabled: true,
    timeout: 15000,
  },
  args: [
    {
      name: "duration",
      type: "time",
      required: true,
    },
    {
      name: "override",
      type: "string",
      required: false,
    },
  ],
  restrictions: {
    ownerOnly: true,
    botPermissions: ["MANAGE_ROLES"],
  },
  async run(message, args) {
    const time = args[0];
    if (args[0] == "clear") {
      const found = message.member?.roles.cache.filter((e) =>
        e.name.startsWith("--ov-")
      );
      if (!found?.size)
        return await message.reply(
          "❌ You have no overrides currently enabled"
        );
      message.member?.roles.cache.forEach((e) => {
        if (e.name.startsWith("--ov-")) e.delete();
      });
      return await message.reply(
        `${Emojis.WHITE_CHECK_MARK} Cleared ${found?.size} overrides.`
      );
    }
    const override = args.slice(1).join(" ").toLowerCase();
    const ms = parseTimeString(time!);
    if (ms < 500)
      return await message.reply(
        "Must be higher than 500 milliseconds / Invalid Time String"
      );
    if (!Object.keys(overrides).includes(override))
      return await message.reply(
        `${
          Emojis.WARNING
        } Unknown Override, available options are ${Object.keys(overrides)
          .map((e) => `\`${e}\``)
          .join(", ")}`
      );

    const ovRole = overrides[override];
    const role = await message.guild?.roles.create({
      name: ovRole?.name,
      permissions: ovRole?.permissions,
      color: Color.embed,
    });
    await message.member?.roles.add(role!);
    await message.reply(
      `${Emojis.WHITE_CHECK_MARK} Gave you \`${
        ovRole?.name
      }\` override for ${simpleGetLongAgo(Date.now() - ms)}`
    );
    setTimeout(async () => {
      await role?.delete();
      try {
        await message.react(Emojis.TIMER);
      } catch (_) {
        await message.channel.lastMessage?.react(Emojis.TIMER);
      }
    }, ms);
  },
} as ICommand;
