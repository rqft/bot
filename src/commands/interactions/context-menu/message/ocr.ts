// import { InteractionContext } from "detritus-client/lib/interaction";
// import { imageOcr } from "../../../../functions/formatter";
// import { Parameters } from "../../../../functions/parameters";
// import {
//   BaseContextMenuMessageCommand,
//   ContextMenuMessageArgs,
// } from "../../baseinteraction";

// export default class ImageOcrCommand extends BaseContextMenuMessageCommand {
//   name = "Text Recognition";

//   async run(context: InteractionContext, _args: ContextMenuMessageArgs) {
//     console.log("ok started");
//     const embed = await imageOcr(
//       context,
//       (await Parameters.imageUrl("png")("", context))!
//     );
//     console.log("ok got texts");

//     return await context.editOrRespond({
//       embeds: [embed],
//       content: "\u200b",
//     });
//   }
// }
