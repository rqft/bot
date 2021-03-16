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
    actor_cant_self: "You can't target yourself",
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
    kick: {
      failed_kick: "❌ Failed to kick member.",
      kicked_member: "✅ Kicked {USER} from the server{REASON}",
    },
    args: {
      missing_args:
        "❌ {USER} Argument error (missing required argument(s): {MISSING_ARG}) {USAGE_MESSAGE}",
      missing_args_usage: "\n```\n{USAGE}```",
    },
    nickme: {
      already_nick: "❌ I already have that nickname!",
      done: "✅ Done!",
      failed_nick: "❌ Failed to set my nickname",
    },
  },
};
