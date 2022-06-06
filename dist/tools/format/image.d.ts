import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { APIs } from "pariah";
import { Basic } from "./basic";
export declare module Image {
    const instance: APIs.Jonathan.API;
    interface MirrorArgs extends Basic.ImageArgs {
        method: APIs.Jonathan.MirrorMethods;
    }
    function mirror(context: Context | InteractionContext, args: MirrorArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    function spin(context: Context | InteractionContext, args: Basic.ImageArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    interface ColorArgs {
        color: string;
        size: number;
    }
    function color(context: Context | InteractionContext, args: ColorArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    interface ResizeArgs extends Basic.ImageArgs {
        size: string;
    }
    function resize(context: Context | InteractionContext, args: ResizeArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    interface RotateArgs extends Basic.ImageArgs {
        degrees: number;
    }
    function rotate(context: Context | InteractionContext, args: RotateArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    function url(context: Context | InteractionContext, args: Basic.ImageArgs): Promise<import("detritus-client/lib/structures").Message | null>;
}
