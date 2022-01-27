// import { InteractionContext } from "detritus-client/lib/interaction";
// import { imageOcr } from "../../../functions/formatter";
// import { ImageUrlArgs } from "../../prefixed/basecommand";
// import { BaseInteractionImageCommandOption } from "../baseinteraction";

// export default class ImageOcrCommand extends BaseInteractionImageCommandOption {
//   name = "ocr";
//   description = "Get text from an image";

//   async run(context: InteractionContext, args: ImageUrlArgs) {
//     const embed = await imageOcr(context, args.image);

//     return await context.editOrRespond({
//       embeds: [embed],
//       content: "\u200b",
//     });
//   }
// }
