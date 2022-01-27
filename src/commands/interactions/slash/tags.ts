// import { InteractionContext } from "detritus-client/lib/interaction";
// import { imageTags } from "../../../functions/formatter";
// import { ImageUrlArgs } from "../../prefixed/basecommand";
// import { BaseSlashCommand } from "../baseinteraction";

// export default class ImageTagsCommand extends BaseSlashCommand {
//   name = "tags";
//   description = "Get descriptions for an image";
//   constructor() {
//     super({
//       // options: [BaseInteractionImageCommandOption],
//     });
//   }

//   async run(context: InteractionContext, args: ImageUrlArgs) {
//     const embed = await imageTags(context, args.image);

//     return await context.editOrRespond({
//       embeds: [embed],
//       content: "\u200b",
//     });
//   }
// }
