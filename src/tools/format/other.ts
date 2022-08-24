/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from "detritus-client/lib/command";
import {
  InteractionAutoCompleteContext,
  InteractionContext,
} from "detritus-client/lib/interaction";
import { Message } from "detritus-client/lib/structures";
import * as Process from "node:child_process";
import { BaseCommand } from "../../commands/prefixed/basecommand";
import { commands } from "../../globals";
import { CustomEmojis } from "../emojis";
import { Err } from "../error";
import { Markdown } from "../markdown";
import { Paginator } from "../paginator";
import { editOrReply } from "../tools";
import { Basic } from "./basic";
import { Embed } from "./embed";
import { Image } from "./image";
export interface CodeArgs {
  code: string;
  "json-spacing": number;
}
export async function code(
  context: Context | InteractionContext,
  args: CodeArgs
): Promise<Message | null> {
  if (!context.client.isOwner(context.userId)) {
    throw new Err("no", { status: 403 });
  }

  const text = args.code;
  let language = "ts";
  let message: string;
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
        : (error as string);
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
): Promise<Message | null> {
  if (!context.client.isOwner(context.userId)) {
    throw new Err("no", { status: 403 });
  }
  const text = args.code;
  let message = "";
  try {
    const data = Process.execSync(text);
    message = data.toString("utf-8");
  } catch (error) {
    message = (error as Error).message;
  }

  return await editOrReply(
    context,
    Markdown.Format.codeblock(message).toString()
  );
}
export interface KwanziArgs {
  text: string;
}
export async function kwanzi(
  context: Context | InteractionContext,
  args: KwanziArgs
): Promise<Message | null> {
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

export async function stats(
  context: Context | InteractionContext
): Promise<void> {
  const embed = Embed.user(context);
  if (embed) {
    void 0;
  }
}

export async function ping(
  context: Context | InteractionContext
): Promise<Message | null> {
  const ts =
    "message" in context
      ? context.message.createdAtUnix || context.message.editedAtUnix
      : context.interaction.createdAtUnix;
  return await editOrReply(context, `${Date.now() - ts}ms`);
}

export interface HelpArgs {
  query?: string;
}

export async function help(
  context: Context | InteractionContext,
  args: HelpArgs
): Promise<Message | null> {
  const { query } = args;

  if (context.commandClient) {
    let commands = context.commandClient.commands;
    if (query) {
      commands = commands.filter((command) => {
        return command.names.some((name) => {
          return (
            name.toLowerCase().startsWith(query.toLowerCase()) ||
            name.toLowerCase().includes(query.toLowerCase())
          );
        });
      });
    }

    if (!commands.length) {
      throw new Err("No commands found", { status: 404 });
    }

    const paginator = new Paginator(context, {
      pageLimit: commands.length,
      onPage(page: number) {
        const command = commands[page - 1]!;
        const embed = Embed.user(context);

        if (command instanceof BaseCommand) {
          embed.setTitle(command.name);
          if (command.aliases.length) {
            embed.addField("Aliases", command.aliases.join(", "));
          }

          if (command.metadata) {
            if (command.metadata.description) {
              embed.setDescription(
                Markdown.Format.italics(command.metadata.description).toString()
              );
            }

            {
              const description: Array<string> = [];

              description.push(
                Basic.field(
                  CustomEmojis.CHANNEL_CATEGORY,
                  "Category",
                  command.metadata.category
                )
              );

              description.push(
                Basic.field(
                  CustomEmojis.CHANNEL_TEXT_NSFW,
                  "NSFW",
                  command.metadata.nsfw ? "Yes" : "No"
                )
              );

              embed.addField("Information", description.join("\n"));
            }

            if (command.metadata.usage) {
              const description: Array<string | Markdown.Format> = [];

              description.push(
                Markdown.Format.codeblock(
                  command.fullName + " " + command.metadata.usage
                )
              );

              if (command.metadata.examples) {
                if (command.metadata.examples.length) {
                  description.push(
                    Markdown.Format.codeblock(
                      command.metadata.examples
                        .map((example) => {
                          return command.fullName + " " + example;
                        })
                        .join("\n")
                    )
                  );
                }
              }

              embed.addField("Usage", description.join("\n"));
            }
          }
        }

        return embed;
      },
    });

    return await paginator.start();
  }

  throw new Err("Context does not have a CommandClient attached", {
    status: 500,
  });
}

export async function helpAutocomplete(
  context: InteractionAutoCompleteContext
) {
  const query = context.value;
  const cmds = commands.commands;
  if (query) {
    const filtered = cmds.filter((command) => {
      return command.names.some((name) => {
        return (
          name.toLowerCase().startsWith(query.toLowerCase()) ||
          name.toLowerCase().includes(query.toLowerCase())
        );
      });
    });

    return await context.respond({
      choices: filtered
        .map((command) => {
          return {
            name: command.name,
            value: command.name,
          };
        })
        .slice(0, 25),
    });
  }

  return await context.respond({
    choices: cmds
      .map((command) => {
        return {
          name: command.name,
          value: command.name,
        };
      })
      .slice(0, 25),
  });
}

export async function invite(
  context: Context | InteractionContext
): Promise<Message | null> {
  return await editOrReply(context, `<https://bot.clancy.lol/>`);
}

export interface GraphArgs {
  expr: Array<string>;
  size?: number;
}

export async function graph(
  context: Context | InteractionContext,
  args: GraphArgs
): Promise<Message | null> {
  const { payload: image } = await Image.instance.graph(args.expr, args.size);

  const embed = await Embed.image(context, image, "graph.png");

  return await editOrReply(context, embed);
}
