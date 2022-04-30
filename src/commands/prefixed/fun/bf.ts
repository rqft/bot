// import { Command, CommandClient } from "detritus-client";
// import { Markup } from "detritus-client/lib/utils";
// import { Brand } from "../../../enums/brands";
// import { BrainFuck } from "../../../functions/brainfuck";
// import { createBrandEmbed } from "../../../functions/embed";
// import { editOrReply } from "../../../functions/tools";
// import { BaseCommand, FunMetadata } from "../basecommand";
// export interface BrainFuckArgs {
//   text: string;
//   input: string;
// }
// export default class BrainFuckCommand extends BaseCommand {
//   constructor(client: CommandClient) {
//     super(client, {
//       name: "bf",
//       type: String,
//       label: "text",

//       args: [{ name: "input", type: String, default: "" }],
//       metadata: FunMetadata(
//         "Run brainfuck code",
//         "<script: string> <-input: string>",
//         ["++[>+<-]>."]
//       ),
//     });
//   }

//   async run(context: Command.Context, args: BrainFuckArgs) {
//     const bf = new BrainFuck(args.text, args.input);
//     const output = bf.run();

//     const embed = createBrandEmbed(Brand.VYBOSE, context);
//     embed.setTitle("Brainfuck Code Output");

//     embed.addField("Input", Markup.codeblock(args.input, { language: "bf" }));
//     embed.addField("Final Tape", Markup.codeblock(output.tape.join(" ")));
//     if (output.out.length) {
//       embed.addField("Outputs", Markup.codeblock(output.out.join("")), true);
//       embed.addField(
//         "Outputs (Ascii)",
//         Markup.codeblock(
//           output.out.map((v) => String.fromCharCode(v)).join("")
//         ),
//         true
//       );
//     }

//     return await editOrReply(context, { embed });
//   }
// }
