import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import * as Process from "node:child_process";
import { Err } from "../error";
import { Markdown } from "../markdown";
import { editOrReply } from "../tools";
export interface CodeArgs {
  code: string;
  "json-spacing": number;
}
export async function code(
  context: Context | InteractionContext,
  args: CodeArgs
) {
  if (!context.client.isOwner(context.userId)) {
    throw new Err("no", { status: 403 });
  }
  const text = args.code;
  let language = "ts";
  let message: any;
  try {
    message = await Promise.resolve(eval(text));

    if (typeof message === "object") {
      message = JSON.stringify(message, null, args["json-spacing"]);
      language = "json";
    }
  } catch (error) {
    message =
      error instanceof Error
        ? error.stack || error.message
        : error instanceof Err
          ? error.toString()
          : error;
  }

  message = String(message);

  return await editOrReply(
    context,
    Markdown.Format.codeblock(message, language).toString()
  );
}
export interface ExecArgs {
  code: string;
}
export async function exec(
  context: Context | InteractionContext,
  args: ExecArgs
) {
  if (!context.client.isOwner(context.userId)) {
    throw new Err("no", { status: 403 });
  }
  const text = args.code;
  let message = "";
  try {
    const data = Process.execSync(text);
    message = data.toString('utf-8');
  } catch (error) {
    message = (error as Error).message;
  }

  return await editOrReply(context, Markdown.Format.codeblock(message).toString());
}
export interface KwanziArgs {
  text: string;
}
export async function kwanzi(
  context: Context | InteractionContext,
  args: KwanziArgs
) {
  const { text: payload } = args;
  const list = Array.from(new Set(payload.toLowerCase().split(" ")));
  const hit: Array<string> = [];
  const output: Array<string> = [];

  while (hit.length < list.length) {
    const index = Math.floor(Math.random() * list.length);
    const item = list[index]!;
    output.push(item);
    if (hit.includes(item)) {
      continue;
    }

    hit.push(item);
    if (Math.random() > 0.7) {
      list.splice(index, 1);
    }
  }

  return await editOrReply(context, output.join(" "));
}
