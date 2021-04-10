const base = "http://ocr.y21_.repl.co/?url=";
import fetch from "node-fetch";
import { limit } from "../../functions/limit";
import { replacer } from "../../functions/replacer";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "ocr",
  args: [
    {
      name: "url",
      required: false,
      type: "text",
    },
  ],
  async run(message, args) {
    var url = message.attachments.array()[0]
      ? message.attachments.array()[0]!.url
      : args.join(" ");
    if (!url)
      return await reply(message, messages.commands.other.ocr.needs_image);
    const request = await fetch(base + url);
    if (!request.ok)
      return await reply(message, messages.commands.other.ocr.error_with_api);
    const text = await request.text();
    if (!text || !text.length)
      return await reply(
        message,

        messages.commands.other.ocr.no_text_identified
      );
    // console.log(text);

    await reply(
      message,

      replacer(messages.commands.other.ocr.ocr_cmd, [
        ["{CONTENT}", limit(text, 1900)],
      ])
    );
  },
} as ICommand;
