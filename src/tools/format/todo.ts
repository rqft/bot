import { Context } from "detritus-client/lib/command";
import {
  InteractionAutoCompleteContext,
  InteractionContext,
} from "detritus-client/lib/interaction";
import { User } from "detritus-client/lib/structures";
import { APIs } from "pariah";

import { Err } from "../error";
import { Markdown } from "../markdown";
import { editOrReply } from "../tools";

export module Todo {
  export const instance = new APIs.Jonathan.API();

  export interface GetTodoArgs {
    id: number;
    user: User;
  }

  export async function get(
    context: Context | InteractionContext,
    args: GetTodoArgs
  ) {
    const { payload: todo } = await instance.todoGet(
      args.user.id || context.userId,
      String(args.id)
    );
    if (todo.status.state === "error") {
      throw new Err(todo.status.message, { status: todo.status.code });
    }

    return await editOrReply(context, todo.data);
  }

  export interface PostTodoArgs {
    data: string;
  }

  export async function post(
    context: Context | InteractionContext,
    args: PostTodoArgs
  ) {
    const { payload: todo } = await instance.todoPost(
      context.userId,
      args.data
    );
    if (todo.status.state === "error") {
      throw new Err(todo.status.message, { status: todo.status.code });
    }

    return await editOrReply(context, "ok, added to list");
  }

  export interface PutTodoArgs {
    id: number;
    data: string;
  }

  export async function put(
    context: Context | InteractionContext,
    args: PutTodoArgs
  ) {
    const { payload: todo } = await instance.todoPut(
      context.userId,
      String(args.id),
      args.data
    );

    if (todo.status.state === "error") {
      throw new Err(todo.status.message, { status: todo.status.code });
    }

    return await editOrReply(context, "ok, updated item");
  }

  export interface DeleteTodoArgs {
    id: number;
  }

  export async function remove(
    context: Context | InteractionContext,
    args: DeleteTodoArgs
  ) {
    const { payload: todo } = await instance.todoDelete(
      context.userId,
      String(args.id)
    );
    if (todo.status.state === "error") {
      throw new Err(todo.status.message, { status: todo.status.code });
    }

    return await editOrReply(context, "ok, deleted");
  }

  export interface ListTodoArgs {
    user: User;
  }

  export async function list(
    context: Context | InteractionContext,
    args: ListTodoArgs
  ) {
    const { payload: todos } = await instance.todoList(args.user.id);
    if (todos.status.state === "error") {
      throw new Err(todos.status.message, { status: todos.status.code });
    }

    console.log(todos);

    const description: Array<string> = [];
    if (todos.data.length === 0) {
      description.push("you have no todos :(");
    } else {
      description.push("ok, here's your list");
      description.push(
        ...todos.data.map((todo, index) => {
          return `#${index + 1} - ${Markdown.Format.codestring(
            todo.slice(0, 25) + (todo.length > 25 ? "..." : "")
          )}`;
        })
      );
    }

    return await editOrReply(context, description.join("\n"));
  }

  export async function search(context: InteractionAutoCompleteContext) {
    const { payload: tags } = await instance.todoSearch(
      context.userId,
      context.value
    );

    // never
    if (tags.status.state === "error") {
      return await context.respond({ content: ":(" });
    }

    return await context.respond({ choices: tags.data });
  }
}
