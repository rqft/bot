import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Message } from "detritus-client/lib/structures";
export interface CodeArgs {
    code: string;
    "json-spacing": number;
}
export declare function code(context: Context | InteractionContext, args: CodeArgs): Promise<Message | null>;
export interface ExecArgs {
    code: string;
}
export declare function exec(context: Context | InteractionContext, args: ExecArgs): Promise<Message | null>;
export interface KwanziArgs {
    text: string;
}
export declare function kwanzi(context: Context | InteractionContext, args: KwanziArgs): Promise<Message | null>;
export declare function stats(context: Context | InteractionContext): Promise<void>;
export declare function ping(context: Context | InteractionContext): Promise<Message | null>;
