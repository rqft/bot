import chalk from "chalk";
export const messages = {
  client: {
    unable_to_get_user: "❌ Unable to get user",
    ready: "📦 Ready",
    logged_in: `✅ Took ${chalk.yellow(`{TIME}`)} to log in as ${chalk.red(
      "{USER}"
    )} (uploading ${chalk.green("{GUILDS} guilds")} and ${chalk.blue(
      "{MEMBERS} members"
    )}) with a ${chalk.redBright("shard count of {SHARDS}")}`,
    recieved_event: `🌀 ${chalk.grey(`{TIMESTAMP}`)} ${chalk.blue(
      "{USER}"
    )} Recieved event ${chalk.red('"{EVENT}"')} `,
    unable_to_get_application: "❌ Unable to get bot application",
  },
  permissions: {
    missing_permissions: "❌ You need {PERMISSIONS} to run this command",
    missing_permissions_me: "❌ I need {PERMISSIONS} to run this command",
    missing_level: "❌ You need bot level **{LEVEL}** to run this command",
    missing_dev: "❌ You need to be a global admin to run this command",
    missing_owner: "❌ You need to be the server owner to run this command",
  },
  targeting: {
    actor_cant_level:
      "❌ You can't target this user (due to their level of {LEVEL})",
    actor_cant_hierarchy:
      "❌ You can't target this user (due to their role hierarchy)",
    actor_cant_admin:
      "❌ You can't target this user as they are a global admin.",
    actor_cant_self: "❌ You can't target yourself",
    me: "❌ You can't target me",
    not_found: {
      guild_member: "❌ I can't find that member (are they in the server?)",
      user: "❌ I can't find that user",
      role: "❌ I can't find that role",
      channel: "❌ I couldn't find that channel (do I have access to it?)",
      guild: "❌ I can't find that server",
      emoji: "❌ I can't find that emoji",
    },
  },
  error: {
    ratelimit: {
      message:
        "using {COMMAND} too fast (`{COMMANDS}/{COMMANDS_MAX}` commands within `{TIME}`). Please wait `{REMAINING}`.",
      guild: "❌ This server ({CAUSE}) is ",
      channel: "❌ This channel ({CAUSE}) is ",
      user: "❌ You ({CAUSE}) are using ",
    },
    error_command:
      "❌ There was an error while using command: ```js\n{ERROR}```",
    error_running_command:
      "❌ There was an error running this command: ```js\n{ERROR}```",
    command_failed:
      "❌ An error caused this command to fail: ```js\n{ERROR}```",
  },
  commands: {
    infractions: {
      failed_kick: "❌ Failed to kick member",
      kicked_member: "✅ Kicked {USER} from the server {REASON}",
      failed_ban: "❌ Failed to ban member",
      banned_member: "✅ Banned {USER} from the server {REASON}",
      already_banned: "❌ {USER} is already banned",
      failed_unban: "❌ Failed to unban member",
      not_banned: "❌ {USER} is not banned",
      unbanned_member: "✅ Unbanned {USER} from the server",
      failed_mute: "❌ Failed to mute member",
      muted_member: "✅ Muted {USER} in this channel",
      already_muted: "❌ {USER} is already muted",
      failed_unmute: "❌ Failed to unmute member",
      unmuted_member: "✅ Unmuted {USER} in this channel",
      not_muted: "❌ {USER} is not muted",
    },
    admin: {
      clean: {
        too_many_msgs: "❌ Can't clean that many messages at once",
        invalid_count: "❌ Count must be a number",
        already_cleaning:
          "❌ Already performing a clean operation, please try again later",
        failed_clean: "❌ Failed to clean messages.",
        no_messages_cleaned: "❌ No messages were cleaned.",
        cleaned_messages_images:
          "✅ Cleaned ~{COUNT} messages with attachments.",
        cleaned_messages_all: "✅ Cleaned ~{COUNT} messages.",
        cleaned_messages_self: "✅ Cleaned ~{COUNT} of your messages.",
        cleaned_messages_bots: "✅ Cleaned ~{COUNT} messages from bots.",
      },
      slowmode: {
        channel_already_slowmode: "❌ Channel is already at this slowmode",
        slowmode_enabled:
          "⏲ This channel has been set to `{TIME}` slowmode by {ACTOR}",
        slowmode_disabled:
          "⏲ This channel has had slowmode disabled by {ACTOR}",
        slowmode_cmd: "✅ Set slowmode on {CHANNEL} to `{TIME}`",
        slowmode_failed: "❌ Failed to set slowmode",
        not_text: "❌ Cannot set slowmode of non-text channels",
      },
    },
    confirmation: {
      deny: "✅ Okay, I will not run that command.",
      response: "🔨 Awaiting confirmation...",
      timeout: "❌ User failed to confirm the command within {TIMEOUT}",
    },
    args: {
      missing_args:
        "❌ {USER} Argument error (missing required argument(s): {MISSING_ARG}) \n```\n{USAGE}```",
      missing_args_usage: "",
      wrong_type:
        "❌ {USER} Argument error (`{ARG}`: not a {TYPE}) \n```\n{USAGE}```",
    },
    other: {
      urban: {
        no_results: "❌ No results found",
      },
      snowflake: {
        invalid_snowflake: "❌ Invalid snowflake `{SNOWFLAKE}`",
      },
      invite: {
        invalid_invite: "❌ Invalid invite code",
        unknown_invite: "❌ Unknown invite `{CODE}`",
        uses: "📡 {USES} out of {USES_MAX} max uses",
        created: "⏰ Created {CREATED} ago",
        expires_in: "🔨 Will expire in {EXPIRY}",
        inviter: "📩 Invitation by {USER}",
        channel: "🎯 Sends to {CHANNEL}",
        no_stats: "❌ No statistics available",
      },
      nickme: {
        already_nick: "❌ I already have that nickname",
        done: "✅ Done",
        failed_nick: "❌ Failed to set my nickname",
      },
      emoji: "🖼 Here is your emoji",
      ping: "{DIFF}; Heartbeat is {HEARTBEAT} [`{UPTIME}` uptime]",
      avatar: {
        avatar_of: "🖼 Avatar of {USER}: \n🔗 Links: {URLS}",
        requested_by: "🌀 Requested by {USER_TAG} ({USER_ID})",
      },
      spotify: {
        not_found: "❌ Not found",
      },
      help: {
        invalid_command: "❌ Invalid command `{QUERY}`",
        commands_list: "🔨 Here's a list of all my commands: {COMMANDS}",
        info_on_specific:
          '\n🎯 You can send "{PREFIX}help [command name]" to get info on a specific command!',
        cmd: {
          name: "📝 **Name**: `{NAME}`",
          module: "🔗 **Module**: `{MODULE}`",
          aliases: "📌 **Aliases**: {ALIASES}",
          args: "🎯 **Arguments**: `{USAGE}`",
          confirm: "⚠ **Confirmation**: Expires after {TIMEOUT}",
          restrictions: {
            level: "🔨 **Bot Level**: `{LEVEL}`",
            bot_permissions: "📡 **Bot Permissions**: {PERMISSIONS}",
            permissions: "🎯 **User Permissions**: {PERMISSIONS}",
            dev: "🔗 **Bot Owner Only**",
            server_owner: "🔗 **Server Owner Only**",
          },
        },
      },
      reminder: {
        will_remind_in: "✅ I will remind you in {DURATION}",
        remind_message:
          "⌛ Hey {USER_MENTION}, You asked me at `{TIME_UTC} UTC` ({TIME_AGO} ago) to remind you about: {REMINDER_TEXT}",
        reminder_time_limit: "❌ Time must be less than {MAX_TIME}",
      },
      ocr: {
        needs_image: "❌ You need to supply an image",
        no_text_identified: "❌ No text was identified",
        error_with_api: "❌ Something went wrong with reading your image",
        ocr_cmd: "📝🖼\n```\n{CONTENT}```",
      },
      plot: {
        something_wrong: "❌ There was something wrong with the graphing API",
        error: "❌ There was an error",
        no_pods: "❌ No valid results found",
        no_subpods: "❌ I found results, but none of them had what you wanted.",
        plot_cmd: "🗺 Plots of `{QUERY}` (took {TIME}ms to complete):",
      },
    },
    dm: "❌ Commands must be run in a server",
  },
};
