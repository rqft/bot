import { Client, Intents } from "discord.js";
import { messages } from "./messages";

const client = new Client({
  allowedMentions: {
    users: [],
    repliedUser: false,
  },
  intents: Intents.ALL,
});
client.once("ready", () => console.log(messages.client.logged_in));
client.on("ready", () => console.log(messages.client.ready));
