import { APIs } from "@rqft/fetch";
import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Message } from "detritus-client/lib/structures";
import { Brand } from "../../constants";
import { Secrets } from "../../secrets";
import { Err } from "../error";
import { Markdown } from "../markdown";
import { Paginator } from "../paginator";
import { editOrReply, padCodeBlockFromRows } from "../tools";
import { Basic } from "./basic";
import { Embed } from "./embed";

export module Imagga {
  const instance = new APIs.Imagga.API(Secrets.Key.ImaggaAuth);

  export async function tags(
    context: Context | InteractionContext,
    args: Basic.MediaArgs
  ): Promise<Message | null> {
    const { target } = args;

    const {
      payload: { result, status },
    } = await instance.tags(target);
    if (status.type === "error") {
      throw new Err(status.text);
    }

    const embed = Embed.brand(context, Brand.IMAGGA);
    embed.setThumbnail(target);

    const text = padCodeBlockFromRows(
      result.tags
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 20)
        .map((x) => [x.tag.en, x.confidence.toPrecision(4) + "%"]),
      { join: " | " }
    ).join("\n");

    embed.setDescription(Markdown.Format.codeblock(text).toString());

    return await editOrReply(context, { embed });
  }

  export function colorsTable(colors: Array<APIs.Imagga.Color>): string {
    return padCodeBlockFromRows(
      colors.map((x) => [
        `${x.closest_palette_color} (${x.html_code})`,
        x.percent.toPrecision(4) + "%",
      ]),
      { join: " | " }
    ).join("\n");
  }

  export async function colors(
    context: Context | InteractionContext,
    args: Basic.MediaArgs
  ): Promise<Message | null> {
    const { target } = args;

    const {
      payload: { result, status },
    } = await instance.colors(target, {});
    if (status.type === "error") {
      throw new Err(status.text);
    }

    const embed = Embed.brand(context, Brand.IMAGGA);
    embed.setThumbnail(target);

    {
      embed.addField(
        "Colour Variance",
        result.colors.color_variance.toLocaleString(),
        true
      );
      embed.addField(
        "Colour Percent Threshold",
        result.colors.color_percent_threshold.toLocaleString(),
        true
      );
      embed.addField(
        "Object Percentage",
        result.colors.object_percentage.toLocaleString(),
        true
      );
    }

    {
      const text = colorsTable(result.colors.background_colors);
      embed.addField(
        "Background Colors",
        Markdown.Format.codeblock(text).toString()
      );
    }

    {
      const text = colorsTable(result.colors.foreground_colors);
      embed.addField(
        "Foreground Colors",
        Markdown.Format.codeblock(text).toString()
      );
    }

    {
      const text = colorsTable(result.colors.image_colors);
      embed.addField(
        "Image Colors",
        Markdown.Format.codeblock(text).toString()
      );
    }

    return await editOrReply(context, { embed });
  }

  export async function categories(
    context: Context | InteractionContext,
    args: Basic.MediaArgs
  ): Promise<Message | null> {
    const { target } = args;

    const {
      payload: { result, status },
    } = await instance.categories(target, "general_v3");
    if (status.type === "error") {
      throw new Err(status.text);
    }

    const embed = Embed.brand(context, Brand.IMAGGA);
    embed.setThumbnail(target);

    {
      const text = padCodeBlockFromRows(
        result.categories.map((x) => [
          x.name.en.replace(/\.n\.\d+/g, "").replace(/_/g, " "),
          x.confidence.toPrecision(4) + "%",
        ]),
        { join: " | " }
      ).join("\n");
      embed.setDescription(Markdown.Format.codeblock(text).toString());
    }

    return await editOrReply(context, { embed });
  }

  export async function readText(
    context: Context | InteractionContext,
    args: Basic.MediaArgs
  ): Promise<Message | null> {
    const { target } = args;

    const {
      payload: { result, status },
    } = await instance.readText(target);
    if (status.type === "error") {
      throw new Err(status.text);
    }

    if (!result.text.length) {
      throw new Err("No text found", { status: 404 });
    }

    const paginator = new Paginator(context, {
      pageLimit: result.text.length,
      onPage: (page) => {
        const { coordinates, data } = result.text[page - 1]!;

        const embed = Embed.brand(context, Brand.IMAGGA);
        embed.setThumbnail(target);

        const width = coordinates.xmax - coordinates.xmin;
        const height = coordinates.ymax - coordinates.ymin;
        embed.setDescription(`Page ${page}/${result.text.length}`);
        embed.addField(
          `Location: (${coordinates.xmin}, ${coordinates.ymin})`,
          `Size: ${width}x${height}\n` +
            Markdown.Format.codeblock(data).toString()
        );
        return embed;
      },
    });

    return await paginator.start();
  }
}
