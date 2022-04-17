// import { Command, CommandClient } from "detritus-client";
// import { Markup } from "detritus-client/lib/utils";
// import imagescript from "imagescript";
// import vm from "node:vm";
// import { Parameters } from "../../../functions/parameters";
// import { BaseCommand } from "../basecommand";

// export interface JsArgs {
//   code: string;
// }
// export default class JsCommand extends BaseCommand {
//   constructor(client: CommandClient) {
//     super(client, {
//       name: "js",
//       label: "code",
//       type: Parameters.codeblock,
//       required: true,
//     });
//   }
//   async run(context: Command.Context, args: JsArgs) {
//     const value = exec(args.code);
//     return await editOrReply(context,
//       Markup.codeblock(value ?? "undefined", { language: "js" })
//     );
//   }
// }

// const context = {
//   imagescript,
// };
// function exec(code: string): any {
//   const script = new vm.Script(code);
//   vm.createContext(context);
//   return script.runInContext(context);
// }
