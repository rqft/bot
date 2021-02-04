"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../functions/api");
module.exports = {
    name: "pogface",
    description: "POGER",
    aliases: ["pog"],
    usage: "",
    usesArgs: false,
    async run(message) {
        const url = "https://raw.githubusercontent.com/MattIPv4/pogchamp/master/build/history.json";
        const pogAPI = (await api_1.api(url));
        const face = pogAPI[~~(Math.random() * pogAPI.length)]?.img.large;
        await message.channel.send("poger", {
            files: [
                {
                    name: "pog.png",
                    attachment: face,
                },
            ],
        });
    },
};
