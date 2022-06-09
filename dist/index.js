"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("./globals");
const secrets_1 = require("./secrets");
globals_1.commands.addMultipleIn("/commands/prefixed", { subdirectories: true });
globals_1.interactions.addMultipleIn("/commands/interactions", { subdirectories: true });
process.on("uncaughtException", (e) => {
    console.error(JSON.stringify(e, null, 2));
    console.error(e);
});
process.on("unhandledRejection", (reason) => {
    console.error(JSON.stringify(reason, null, 2));
    console.error(reason);
});
(async function run() {
    await globals_1.commands.run();
    if (secrets_1.Secrets.ClearInteractions) {
        console.log("clearing global");
        await globals_1.interactions.rest.bulkOverwriteApplicationCommands(globals_1.interactions.client.applicationId, []);
        for (const guildId of secrets_1.Secrets.InteractionGuilds) {
            console.log(`clearing ${guildId}`);
            await globals_1.interactions.rest.bulkOverwriteApplicationGuildCommands(globals_1.interactions.client.applicationId, guildId, []);
        }
    }
    await globals_1.interactions.run();
    const all = [globals_1.client, globals_1.selfclient];
    for (const client of all) {
        await client.run();
        console.log(`ok connected with ${client.user?.tag}`);
    }
})();
