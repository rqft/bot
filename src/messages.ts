export const messages = {
  client: {
    unable_to_get_user: "❌ Unable to get bot user",
    ready: "📦 Ready!",
    logged_in: "✅ Logged in as {USER}",
  },
  config: {
    cant_download_file: "❌ {USER} I couldn't grab that file",
    cant_delete_message:
      "❌ {USER} I Couldn't delete your message! You might want to delete it yourself.",
    incorrect_guild_id:
      "❌ {USER} Incorrect guild ID in your config!\n\nAre you uploading it to the right server?",
    updated_config: "✅ {USER} updated the config!",
    error_while_updating:
      "❌ {USER} Error whilst updating your config:\n{ERROR}\n",
    get_config:
      "✅ {USER} here you go!\n\n*This message will self-destruct in 15 seconds*",
    get_default_config:
      "✅ {USER} here you go!\n\n**WARNING**: This is the default config, you did not have a config previously saved!\n**It is HIGHLY RECOMMENDED to start from a empty config instead!**\n\n*This message will self-destruct in 15 seconds*",
    deleted_config:
      "✅ {USER} done!\n\nFeel free to request a new config by typing `.config.`",
  },
  permissions: {
    missing_permissions: "❌ You need {PERMISSIONS} to run this command!",
    missing_permissions_me: "❌ I need {PERMISSIONS} to run this command!",
    missing_level: "❌ You need bot level **{LEVEL}** to run this command!",
    missing_dev: "❌ You need to be a global admin to run this command!",
    missing_owner: "❌ You need to be the server owner to run this command!",
  },
  error: {
    error_running_command:
      "❌ There was an error running this command: ```\n{ERROR}```",
  },
};
