import { GIF as ISGif, Image as ISImage } from "imagescript";

export namespace Converter {
  export namespace ImageScript {
    export namespace Image {
      export async function toBuffer(from: ISImage) {
        return Buffer.from(
          (
            await from.encode(undefined, {
              comment: "Provided by the rqft Foundation",
            })
          ).buffer
        );
      }
    }
    export namespace Animation {
      export async function toBuffer(from: ISGif, quality?: number) {
        return Buffer.from((await from.encode(quality)).buffer);
      }
    }
    export const GIF = Animation;
  }
  export namespace Data {
    export namespace Buffers {
      export function toArrayBuffer(buffer: Buffer) {
        return buffer.buffer;
      }
    }
    export namespace ArrayBuffer {
      export function toBuffer(buffer: ArrayBuffer) {
        return Buffer.from(buffer);
      }
    }
  }
}
