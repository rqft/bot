import fetch from "node-fetch";
import { replacer } from "../../functions/replacer";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
import { Secrets } from "../../secrets";
module.exports = {
  name: "plot",
  args: [
    {
      name: "query",
      required: true,
      type: "text",
    },
  ],
  async run(message, args) {
    const query = args.join(" ");
    const base = `http://api.wolframalpha.com/v2/query?`;
    const params = {
      input: query,
      appid: Secrets.Key.wolframAlpha,
      output: "json",
      format: "image",
      width: 1000,
      height: 1000,
    };
    var str = "";
    for (var key in params) {
      if (str != "") {
        str += "&";
      }
      // @ts-ignore shut the fuck up
      str += key + "=" + encodeURIComponent(params[key]);
    }
    const request = await fetch(base + str);
    if (!request.ok)
      await reply(message, messages.commands.other.plot.something_wrong);
    const data = await request.json();
    if (data.queryresult.error)
      return await reply(message, messages.commands.other.plot.error);
    if (
      !data.queryresult.numpods ||
      !data.queryresult.pods ||
      !data.queryresult.pods.length
    )
      return await reply(message, messages.commands.other.plot.no_pods);
    data.queryresult.pods = data.queryresult.pods.filter((e: any) =>
      e.id.toLowerCase().includes("plot")
    );
    if (
      !data.queryresult.pods[0].subpods.length ||
      !data.queryresult.pods[0].subpods ||
      !data.queryresult.pods[0].subpods[0].img
    )
      return await reply(message, messages.commands.other.plot.no_subpods);

    const urls = (data.queryresult.pods[0].subpods as Array<any>)
      .filter((e) => !!e.img)
      .map((e) => ({
        name: `img_${~~(Math.random() * 10)}.png`,
        attachment: e.img.src,
      }));
    await reply(
      message,

      replacer(messages.commands.other.plot.plot_cmd, [
        ["{QUERY}", query],
        ["{TIME}", Date.now() - message.createdTimestamp],
      ]),
      { files: urls }
    );
  },
} as ICommand;
