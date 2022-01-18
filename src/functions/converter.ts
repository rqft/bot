import { GIF as ISOldGIF, Image as ISOldImage } from "imagescript";
import { Animation as ISAnimation, Image as ISImage } from "imagescript/v2";
export namespace Converter {
  export namespace ImageScript {
    export namespace Image {
      export async function v1v2(from: ISOldImage) {
        return new ISImage(from.width, from.height, await imageToBuffer(from));
      }
      export async function v2v1(from: ISImage) {
        return ISOldImage.decode(await from.encode("png"));
      }
      export async function imageToBuffer(from: ISOldImage | ISImage) {
        if (from instanceof ISOldImage) {
          return Buffer.from(
            (
              await from.encode(undefined, {
                comment: "Provided by the rqft Foundation",
              })
            ).buffer
          );
        }
        return Buffer.from((await from.encode("png")).buffer);
      }
    }
    export namespace Animation {
      export async function v1v2(from: ISOldGIF) {
        return ISAnimation.decode("gif", await toBuffer(from));
      }
      export async function v2v1(from: ISAnimation) {
        return ISOldGIF.decode(await toBuffer(from));
      }
      export async function toBuffer(from: ISOldGIF | ISAnimation) {
        if (from instanceof ISOldGIF) {
          return Buffer.from((await from.encode()).buffer);
        }
        return Buffer.from((await from.encode("gif")).buffer);
      }
    }
    export const GIF = Animation;
  }
}
