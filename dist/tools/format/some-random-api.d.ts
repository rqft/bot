import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { APIs } from "pariah";
import { Basic } from "./basic";
export declare module SomeRandomApi {
    const instance: APIs.SomeRandomApi.API;
    const BannedImageOps: Array<APIs.SomeRandomApi.Canvas>;
    const CanvasMethods: APIs.SomeRandomApi.Canvas[];
    interface CanvasArgs extends Basic.ImageArgs {
        method: APIs.SomeRandomApi.Canvas;
        [key: string]: unknown;
    }
    function canvas(context: Context | InteractionContext, args: CanvasArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    const AnimalMethods: APIs.SomeRandomApi.Animals[];
    interface AnimalArgs {
        animal: APIs.SomeRandomApi.Animals;
    }
    function animal(context: Context | InteractionContext, args: AnimalArgs): Promise<import("detritus-client/lib/structures").Message | null>;
}
