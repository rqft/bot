// import { CommandClient } from "detritus-client";
// import { Context } from "detritus-client/lib/command";
// import { ImageFormats } from "detritus-client/lib/constants";
// import { Secrets } from "../../../secrets";
// import { Jonathan } from "../../../tools/api";
// import { ToolsMetadata } from "../../../tools/command-metadata";
// import { Formatter } from "../../../tools/formatter";
// import { Parameters } from "../../../tools/parameters";
// import { editOrReply } from "../../../tools/tools";
// import { BaseCommand } from "../basecommand";

// export default class TestCommand extends BaseCommand {
//   constructor(client: CommandClient) {
//     super(client, {
//       name: "test",
//       metadata: ToolsMetadata(
//         "get tag",
//         "<get: string> ?<-args: Array<string>>"
//       ),
//       type: [
//         {
//           name: "target",
//           type: Parameters.imageUrl(ImageFormats.PNG),
//           required: true,
//         },
//       ],

      
//     });
//   }

//   async run(context: Context, args: Formatter.ImageArgs) {
//     const instance = new Jonathan.API(Secrets.ApiToken);
//     const data = await instance.imageFlop(args.target);
//     const embed = await Formatter.Embed.image(context, data, 'flop.png')
//     return await editOrReply(context, { embed })
//   }
// }