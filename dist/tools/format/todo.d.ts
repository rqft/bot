import { Context } from "detritus-client/lib/command";
import { InteractionAutoCompleteContext, InteractionContext } from "detritus-client/lib/interaction";
import { User } from "detritus-client/lib/structures";
import { APIs } from "pariah";
export declare module Todo {
    const instance: APIs.Jonathan.API;
    interface GetTodoArgs {
        id: number;
        user: User;
    }
    function get(context: Context | InteractionContext, args: GetTodoArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    interface PostTodoArgs {
        data: string;
    }
    function post(context: Context | InteractionContext, args: PostTodoArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    interface PutTodoArgs {
        id: number;
        data: string;
    }
    function put(context: Context | InteractionContext, args: PutTodoArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    interface DeleteTodoArgs {
        id: number;
    }
    function remove(context: Context | InteractionContext, args: DeleteTodoArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    interface ListTodoArgs {
        user: User;
    }
    function list(context: Context | InteractionContext, args: ListTodoArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    function search(context: InteractionAutoCompleteContext): Promise<unknown>;
}
