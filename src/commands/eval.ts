import ImageScript, { Frame, GIF, Image } from "imagescript";
import ImageScript2, { Animation, Image as Image2 } from "imagescript/v2";
import { transpile as ts } from "typescript";
import { inspect } from "util";
import { respond } from "../tools/util";
import { Command } from "../wrap/builder";
export default Command(
  "eval [...code]",
  { args: (self) => ({ code: self.string() }) },
  async (context, args) => {
    if (
      !context.user.isClientOwner &&
      context.userId !== "312715611413413889"
    ) {
      console.log("!!!");
      return;
    }

    let data;
    try {
      const [is, i2] = [ImageScript, ImageScript2];
      data = await Promise.resolve(eval(ts(args.code)));
      // eslint-disable-next-line no-unused-expressions
      [is, i2];
    } catch (e) {
      data = e;
    }

    if (data instanceof Frame || data instanceof GIF || data instanceof Image) {
      return await respond(context, {
        files: [
          {
            filename: "out." + (data instanceof GIF ? "gif" : "png"),
            value: Buffer.from(await data.encode()),
          },
        ],
      });
    }

    if (data instanceof Animation || data instanceof Image2) {
      if (data instanceof Animation) {
        return await respond(context, {
          files: [
            {
              filename: "out.gif",
              value: Buffer.from(await data.encode("gif")),
            },
          ],
        });
      }

      return await respond(context, {
        files: [
          { filename: "out.png", value: Buffer.from(await data.encode("png")) },
        ],
      });
    }

    return await respond.fmt(context, "```js\n{data}\n```", {
      data: inspect(data, { depth: 3, showProxy: true }),
    });
  }
);
