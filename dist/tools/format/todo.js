"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const api_1 = require("../api");
const error_1 = require("../error");
const markdown_1 = require("../markdown");
const tools_1 = require("../tools");
var Todo;
(function (Todo) {
    Todo.instance = new api_1.Sarah();
    async function get(context, args) {
        const { payload: todo } = await Todo.instance.todoGet(args.user.id || context.userId, String(args.id));
        if (todo.status.state === "error") {
            throw new error_1.Err(todo.status.message, { status: todo.status.code });
        }
        return await (0, tools_1.editOrReply)(context, todo.data);
    }
    Todo.get = get;
    async function post(context, args) {
        const { payload: todo } = await Todo.instance.todoPost(context.userId, args.data);
        if (todo.status.state === "error") {
            throw new error_1.Err(todo.status.message, { status: todo.status.code });
        }
        return await (0, tools_1.editOrReply)(context, "ok, added to list");
    }
    Todo.post = post;
    async function put(context, args) {
        const { payload: todo } = await Todo.instance.todoPut(context.userId, String(args.id), args.data);
        if (todo.status.state === "error") {
            throw new error_1.Err(todo.status.message, { status: todo.status.code });
        }
        return await (0, tools_1.editOrReply)(context, "ok, updated item");
    }
    Todo.put = put;
    async function remove(context, args) {
        const { payload: todo } = await Todo.instance.todoDelete(context.userId, String(args.id));
        if (todo.status.state === "error") {
            throw new error_1.Err(todo.status.message, { status: todo.status.code });
        }
        return await (0, tools_1.editOrReply)(context, "ok, deleted");
    }
    Todo.remove = remove;
    async function list(context, args) {
        const { payload: todos } = await Todo.instance.todoList(args.user.id);
        if (todos.status.state === "error") {
            throw new error_1.Err(todos.status.message, { status: todos.status.code });
        }
        console.log(todos);
        const description = [];
        if (todos.data.length === 0) {
            description.push("you have no todos :(");
        }
        else {
            description.push("ok, here's your list");
            description.push(...todos.data.map((todo, index) => {
                return `#${index + 1} - ${markdown_1.Markdown.Format.codestring(todo.slice(0, 25) + (todo.length > 25 ? "..." : ""))}`;
            }));
        }
        return await (0, tools_1.editOrReply)(context, description.join("\n"));
    }
    Todo.list = list;
    async function search(context) {
        const { payload: tags } = await Todo.instance.todoSearch(context.userId, context.value);
        if (tags.status.state === "error") {
            return await context.respond({ content: ":(" });
        }
        return await context.respond({ choices: tags.data });
    }
    Todo.search = search;
})(Todo = exports.Todo || (exports.Todo = {}));
