/// <reference types="node" />
import { Utils } from "detritus-client";
import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Attachment } from "detritus-client/lib/structures";
import { Brand } from "../../constants";
export declare module Embed {
    function user(context: Context | InteractionContext, embed?: Utils.Embed): Utils.Embed;
    function brand(context: Context | InteractionContext, brand?: Brand, embed?: Utils.Embed): Utils.Embed;
    function image(context: Context | InteractionContext, input: URL | string | Buffer | Attachment | ArrayBuffer, name: string, ubrand?: Brand): Promise<Utils.Embed>;
    function card(_context: Context | InteractionContext, text: string, embed?: Utils.Embed): Utils.Embed;
}
