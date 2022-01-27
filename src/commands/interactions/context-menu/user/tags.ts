// import { InteractionContext } from "detritus-client/lib/interaction";
// import { imageTags } from "../../../../functions/formatter";
// import {
//   BaseContextMenuUserCommand,
//   ContextMenuUserArgs,
// } from "../../baseinteraction";

// export default class ImageOcrCommand extends BaseContextMenuUserCommand {
//   name = "User Image Tags";

//   async run(context: InteractionContext, args: ContextMenuUserArgs) {
//     const embed = await imageTags(
//       context,
//       (args.member || args.user).avatarUrlFormat("png")
//     );

//     return await context.editOrRespond({
//       embeds: [embed],
//       content: "\u200b",
//     });
//   }
// }
