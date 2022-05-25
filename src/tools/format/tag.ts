import { Context } from "detritus-client/lib/command";
import { InteractionAutoCompleteContext, InteractionContext } from "detritus-client/lib/interaction";
import { Secrets } from "../../secrets";
import { Jonathan } from "../api";
import { Err } from "../error";
import { Markdown } from "../markdown";
import { Paginator } from "../paginator";
import { Tags } from "../tags";
import { editOrReply, groupArray } from "../tools";
import * as Embed from './embed';

export const instance = new Jonathan.API(Secrets.ApiToken);

    export interface GetTagArgs {
      key: string;
      args: Array<string>;
    }
    export async function get(
      context: Context | InteractionContext,
      args: GetTagArgs
    ) {
      if (args.key === "") {
        return await editOrReply(context, 'Missing required parameter "key"');
      }
      const tag = await instance.tagGet(args.key);
      if (tag.status.state === "error") {
        throw new Err(tag.status.message, { status: tag.status.code });
      }

      const output = await Tags.exec(context, tag.data, args.args);
      if (!output.text) {
        output.text = "\u200b";
      }

      return await editOrReply(context, {
        content: output.text,
        attachments: output.files,
      });
    }

    export interface PostTagArgs {
      key: string;
      value: string;
    }
    export async function post(
      context: Context | InteractionContext,
      args: PostTagArgs
    ) {
      const original = await instance.tagGet(args.key);
      if (original.status.state === "ok" && original.data === args.value) {
        throw new Err("tag already has that value");
      }

      const tag = await instance.tagPost(args.key, args.value);

      if (tag.status.state === "error") {
        throw new Err(tag.status.message, { status: tag.status.code });
      }

      const description = ["ok, i set that tag :D"];
      if (original.data !== null) {
        description.push(
          `original value: ${Markdown.Format.codeblock(original.data)}`
        );
      }
      description.push(`new value: ${Markdown.Format.codeblock(args.value)}`);

      return await editOrReply(context, description.join("\n"));
    }

    export async function remove(
      context: Context | InteractionContext,
      args: GetTagArgs
    ) {
      const tag = await instance.tagDelete(args.key);
      if (tag.status.state === "error") {
        throw new Err(tag.status.message, { status: tag.status.code });
      }

      return await editOrReply(context, "ok, i deleted that tag :)");
    }

    export async function list(context: Context | InteractionContext) {
      const tags = await instance.tagList();
      if (tags.status.state === "error") {
        throw new Err(tags.status.message, { status: tags.status.code });
      }

      const slices = groupArray(tags.data, 100);

      const paginator = new Paginator(context, {
        pageLimit: slices.length,
        onPage(page: number) {
          const slice = slices[page - 1]!;
          const embed = Embed.user(context);
          embed.setDescription(
            `Count: ${tags.data.length}\n` +
              Markdown.Format.codeblock(slice.join(", ")).toString()
          );
          return embed;
        },
      });

      return await paginator.start();
    }

    export async function inspect(context: Context | InteractionContext) {
      const tags = await instance.tagInspect();
      if (tags.status.state === "error") {
        throw new Err(tags.status.message, { status: tags.status.code });
      }

      return await editOrReply(context, {
        files: [
          { value: JSON.stringify(tags.data, null, 2), filename: "data.json" },
        ],
      });
    }

    export async function search(context: InteractionAutoCompleteContext) {
      const tags = await instance.tagSearch(context.value);

      // never
      if (tags.status.state === "error") {
        return await context.respond({ content: ":(" });
      }

      return await context.respond({ choices: tags.data });
    }

    interface ExecTagArgs {
      script: string;
      args: Array<string>;
    }
    export async function exec(
      context: Context | InteractionContext,
      args: ExecTagArgs
    ) {
      const output = await Tags.exec(context, args.script, args.args);
      if (!output.text) {
        output.text = "\u200b";
      }

      return await editOrReply(context, {
        content: output.text,
        attachments: output.files,
      });
    }