import { Context } from "detritus-client/lib/command";
import { InteractionAutoCompleteContext, InteractionContext } from "detritus-client/lib/interaction";
import { APIs } from "pariah";
export declare module Tag {
    export const instance: APIs.Jonathan.API;
    export interface GetTagArgs {
        key: string;
        args: Array<string>;
    }
    export function get(context: Context | InteractionContext, args: GetTagArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    export interface PostTagArgs {
        key: string;
        value: string;
    }
    export function post(context: Context | InteractionContext, args: PostTagArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    export function remove(context: Context | InteractionContext, args: GetTagArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    export function list(context: Context | InteractionContext): Promise<import("detritus-client/lib/structures").Message | null>;
    export function inspect(context: Context | InteractionContext): Promise<import("detritus-client/lib/structures").Message | null>;
    export function search(context: InteractionAutoCompleteContext): Promise<unknown>;
    interface ExecTagArgs {
        script: string;
        args: Array<string>;
    }
    export function exec(context: Context | InteractionContext, args: ExecTagArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    export {};
}
