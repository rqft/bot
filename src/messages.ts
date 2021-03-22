export const messages = {
  client: {
    unable_to_get_user: "❌ Unable to get bot user",
    ready: "📦 Ready!",
    logged_in: "✅ Logged in as {USER}",
  },
  permissions: {
    missing_permissions: "❌ You need {PERMISSIONS} to run this command!",
    missing_permissions_me: "❌ I need {PERMISSIONS} to run this command!",
    missing_level: "❌ You need bot level **{LEVEL}** to run this command!",
    missing_dev: "❌ You need to be a global admin to run this command!",
    missing_owner: "❌ You need to be the server owner to run this command!",
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
    },
  },
  error: {
    error_running_command:
      "❌ There was an error running this command: ```\n{ERROR}```",
  },
  commands: {
    infractions: {
      failed_kick: "❌ Failed to kick member.",
      kicked_member: "✅ Kicked {USER} from the server{REASON}",
      failed_ban: "❌ Failed to ban member.",
      banned_member: "✅ Banned {USER} from the server{REASON}",
      already_banned: "❌ {USER} is already banned",
      failed_unban: "❌ Failed to unban member.",
      not_banned: "❌ {USER} is not banned",
      unbanned_member: "✅ Unbanned {USER} from the server",
    },
    admin: {
      clean: {
        too_many_msgs: "❌ Can't clean that many messages at once!",
        invalid_count: "❌ Count must be a number",
        already_cleaning:
          "❌ Already performing a clean operation, please try again later",
        failed_clean: "❌ Failed to clean messages.",
        no_messages_cleaned: "❌ No messages were cleaned.",
        cleaned_messages_images:
          "✅ Cleaned ~{COUNT} messages with attachments.",
        cleaned_messages_all: "✅ Cleaned ~{COUNT} messages.",
        cleaned_messages_self: "✅ Cleaned ~{COUNT} of your messages.",
        cleaned_messages_bots:
          "✅ Cleaned ~{COUNT} messages from bots. (this command is unreliable, so it may not be exactly {COUNT})",
      },
      slowmode: {
        channel_already_slowmode: "❌ Channel is already at this slowmode",
        slowmode_enabled:
          "This channel has been set to {SECONDS}s slowmode by {ACTOR}",
        slowmode_disabled: "This channel has had slowmode disabled by {ACTOR}",
        slowmode_cmd: "✅ Set slowmode on {CHANNEL} to **{SECONDS}s**",
        slowmode_failed: "❌ Failed to set slowmode",
      },
    },
    confirmation: {
      deny: "✅ Okay! I will not run that command.",
      response:
        "🔨 {USER} Are you sure you want to run this command? This action ({ACTION}) can be destructive to the server.",
      timeout: "❌ User failed to confirm the command within {TIMEOUT}",
    },
    args: {
      missing_args:
        "❌ {USER} Argument error (missing required argument(s): {MISSING_ARG}) {USAGE_MESSAGE}",
      missing_args_usage: "\n```\n{USAGE}```",
    },
    other: {
      invite: {
        invalid_invite: "❌ Invalid invite code!",
        unknown_invite: "❌ Unknown invite `{CODE}`",
        uses: "📡 {USES} out of {USES_MAX} max uses",
        created: "⏰ Created {CREATED} ago",
        expires_in: "🔨 Will expire in {EXPIRY}",
        inviter: "📩 Invitation by {USER}",
        channel: "🎯 Sends to {CHANNEL}",
        no_stats: "❌ No statistics available",
      },
      nickme: {
        already_nick: "❌ I already have that nickname!",
        done: "✅ Done!",
        failed_nick: "❌ Failed to set my nickname",
      },
      ping: "🤖 Pong in @{DIFF}ms; Heartbeat ping @{HEARTBEAT}ms",
      avatar: {
        avatar_of: "🖼 Avatar of {USER}: \n🔗 Links: {URLS}",
        requested_by: "🌀 Requested by {USER_TAG} ({USER_ID})",
      },
    },
    dm: "❌ Commands must be run in a server",
  },
};
