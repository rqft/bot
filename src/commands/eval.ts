import { transpile as ts } from "typescript";
import { inspect } from "util";
import { respond } from "../tools/util";
import { Command } from "../wrap/builder";

export default Command(
  "eval [...code]",
  { args: (self) => ({ code: self.string() }) },
  async (context, args) => {
    if (!context.user.isClientOwner) {
      return;
    }

    let data;
    try {
      data = await Promise.resolve(eval(ts(args.code)));
    } catch (e) {
      data = e;
    }

    return await respond.fmt(context, "```js\n{data}\n```", {
      data: inspect(data, { depth: 3, showProxy: true }),
    });
  }
);
