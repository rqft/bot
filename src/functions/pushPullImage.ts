import { Message } from "detritus-client/lib/structures";
import { client } from "..";
export async function pushPullImage(
  buffer: Buffer,
  filename: string = "image.png"
) {
  const imageCache = client.channels.find(
    (v) =>
      v.name === "storage" && v.parent !== null && v.parent.name === "Vybose"
  );
  const img: Message = await imageCache?.createMessage({
    file: {
      value: buffer,
      filename,
      key: "cache",
    },
  });
  console.log(img.jumpLink);
  return img.attachments.first()!.url!;
}
