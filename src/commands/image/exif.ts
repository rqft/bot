import { Command, CommandClient } from "detritus-client";
import exifr from "exifr";
import FileType from "file-type";
import fetch from "node-fetch";
import { removeCamelCase } from "../../functions/capitalizeWords";
import { findImage } from "../../functions/findImage";
import { formatBytes } from "../../functions/formatBytes";
import { generateEmbed } from "../../functions/generateEmbedTemplate";
import { CustomError } from "../../globals";
import { BaseCommand } from "../basecommand";
export default class ImageCommandTest extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "exif",
      label: "image",
      type: "imageResolvable",
    });
  }
  async run(context: Command.Context, args: Command.ParsedArgs) {
    const imageUrl = await findImage(context, args);
    if (!imageUrl) throw new CustomError("Could not find any images");

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok)
      throw new CustomError(
        `Error ${imageResponse.status}: ${imageResponse.statusText}`
      );

    const image = await imageResponse.buffer();

    const exif = await exifr.parse(image);
    if (!exif) throw new CustomError("No EXIF data");

    exif.Dimensions = exif.ImageWidth + "x" + exif.ImageHeight;
    exif.Size = formatBytes(image.length);

    const type = (await FileType.fromBuffer(image)) ?? {
      ext: "Unknown Extension",
      mime: "Unknown Mime Type",
    };
    exif.MimeType = `\`${type.mime}\``;
    exif.Extension = `\`.${type.ext}\``;

    delete exif.ImageWidth;
    delete exif.ImageHeight;

    const emb = generateEmbed({ user: context.user })
      .setAuthor("Exif Information")
      .setDescription(
        Object.keys(exif)
          .sort()
          .map((v) => `**${removeCamelCase(v)}**: ${exif[v]}`)
          .join("\n")
      );
    emb.setThumbnail(imageUrl);

    context.editOrReply({ embed: emb });
  }
}
