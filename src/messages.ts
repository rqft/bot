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
  },
  error: {
    error_running_command:
      "❌ There was an error running this command: ```\n{ERROR}```",
  },
  commands: {
    args: {
      missing_args:
        "❌ {USER} Argument error (missing required argument(s): {MISSING_ARG}) {USAGE_MESSAGE}",
      missing_args_usage: "\n```\n{USAGE}```",
    },
  },
};
