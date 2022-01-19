// import { Command, CommandClient } from "detritus-client";
// import { Brand } from "../../../enums/brands";
// import { Converter } from "../../../functions/converter";
// import { createImageEmbed } from "../../../functions/embed";
// import { Parameters } from "../../../functions/parameters";
// import { BaseCommand, ImageScriptAnimationArgs } from "../basecommand";
// export interface BloomArgs extends ImageScriptAnimationArgs {
//   blur: number;
//   brightness: number;
// }
// export default class BloomCommand extends BaseCommand {
//   constructor(client: CommandClient) {
//     super(client, {
//       name: "bloom",

//       label: "animation",
//       type: Parameters.ImageScript.animation,
//       required: true,

//       args: [
//         { name: "blur", type: "number", default: 20, required: true },
//         { name: "brightness", type: "number", default: 1.5, required: true },
//       ],
//     });
//   }
//   async run(context: Command.Context, args: BloomArgs) {
//     let { animation } = args;
//     for (let f of [...animation.frames]) {
//       const split1 = f.clone().image.blur("gaussian", args.blur);
//       let split2 = f.clone().image;
//       {
//         const old = await Converter.ImageScript.Image.v2v1(split2);
//         old.lightness(args.brightness, false);
//         split2 = await Converter.ImageScript.Image.v1v2(old);
//       }

//       f.image.overlay(split1).overlay(split2);
//     }

//     const embed = await createImageEmbed(
//       context,
//       await Converter.ImageScript.Animation.toBuffer(animation),
//       undefined,
//       Brand.VYBOSE
//     );
//     return await context.editOrReply({ embed });
//   }
// }
