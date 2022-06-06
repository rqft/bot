import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { APIs } from "pariah";
import { Basic } from "./basic";
export declare module Pxl {
    const instance: APIs.PxlAPI.API;
    function ajit(context: Context | InteractionContext, args: Basic.ImageArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    interface EmojiMosaicArgs extends Basic.ImageArgs {
        "group-size"?: number;
        scale?: boolean;
    }
    function emojiMosaic(context: Context | InteractionContext, args: EmojiMosaicArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    interface EyesArgs extends Basic.ImageArgs {
        type: APIs.PxlAPI.Eyes;
    }
    function eyes(context: Context | InteractionContext, args: EyesArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    interface FlagArgs extends Basic.ImageArgs {
        flag: APIs.PxlAPI.Flags;
        opacity?: number;
    }
    function flag(context: Context | InteractionContext, args: FlagArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    interface GlitchArgs extends Basic.ImageArgs {
        iterations?: number;
        amount?: number;
        "gif-count"?: number;
        "gif-delay"?: number;
    }
    function glitch(context: Context | InteractionContext, args: GlitchArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    interface JpegArgs extends Basic.ImageArgs {
        quality?: number;
    }
    function jpeg(context: Context | InteractionContext, args: JpegArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    function lego(context: Context | InteractionContext, args: EmojiMosaicArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    interface ScreenshotArgs {
        url: URL;
        browser?: APIs.PxlAPI.ScreenshotBrowser;
        "full-page"?: boolean;
        locale?: string;
        theme?: APIs.PxlAPI.ScreenshotTheme;
    }
    function screenshot(context: Context | InteractionContext, args: ScreenshotArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    interface SnapchatArgs extends Basic.ImageArgs {
        filter: APIs.PxlAPI.SnapchatFilters;
    }
    function snapchat(context: Context | InteractionContext, args: SnapchatArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    interface TextArgs {
        text: string;
    }
    function sonic(context: Context | InteractionContext, args: TextArgs): Promise<import("detritus-client/lib/structures").Message | null>;
    function thonkify(context: Context | InteractionContext, args: TextArgs): Promise<import("detritus-client/lib/structures").Message | null>;
}
