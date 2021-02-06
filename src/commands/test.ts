import fetch from "node-fetch";
import { ICommand } from "../interfaces/ICommand";
module.exports = {
  name: "test",
  async run(message, args) {
    const query = args.join(" ");
    const def = await (
      await fetch(
        `https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${query}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host":
              "mashape-community-urban-dictionary.p.rapidapi.com",
            "x-rapidapi-key":
              "a9fb0095e3msh7092e19dd0034e9p1261a5jsnb924703f4137",
          },
        }
      )
    ).json();
    await message.channel.send(JSON.stringify(def, null, "\t"), {
      code: "json",
    });
  },
} as ICommand;
