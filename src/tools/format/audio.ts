import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { APIs } from "pariah";
import { Secrets } from "../../secrets";
import { editOrReply } from "../tools";
import { Basic } from "./basic";

export module Audio {
  export const instance = new APIs.Jonathan.API(Secrets.ApiToken);

  export interface VolumeArgs extends Basic.MediaArgs {
    volume: number;
  }

  export async function volume(
    context: Context | InteractionContext,
    args: VolumeArgs
  ) {
    const { payload: audio } = await instance.audioVolume(
      args.target,
      args.volume
    );

    return await editOrReply(context, {
      files: [{ filename: "volume.mp3", value: audio }],
    });
  }
}
