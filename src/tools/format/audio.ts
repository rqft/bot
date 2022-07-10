import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { APIs } from "pariah";
import { editOrReply } from "../tools";
import { Basic } from "./basic";

export module Audio {
  export const instance = new APIs.Jonathan.API();

  export interface VolumeArgs extends Basic.MediaArgs {
    volume: number;
  }

  export async function volume(
    context: Context | InteractionContext,
    args: VolumeArgs
  ) {
    console.log(args);
    const { payload: audio } = await instance.audioVolume(
      args.target,
      args.volume
    );

    return await editOrReply(context, {
      content: `Volume: ${args.volume}`,
      files: [{ filename: "volume.mp3", value: audio }],
    });
  }

  export interface PitchArgs extends Basic.MediaArgs {
    pitch: number;
  }

  export async function pitch(
    context: Context | InteractionContext,
    args: PitchArgs
  ) {
    const { payload: audio } = await instance.audioPitch(
      args.target,
      args.pitch
    );

    return await editOrReply(context, {
      content: `Pitch: ${args.pitch}`,
      files: [{ filename: "pitch.mp3", value: audio }],
    });
  }

  export async function extract(
    context: Context | InteractionContext,
    args: Basic.MediaArgs
  ) {
    const { payload: audio } = await instance.audioExtract(args.target);

    return await editOrReply(context, {
      files: [{ filename: "extract.mp3", value: audio }],
    });
  }
}
