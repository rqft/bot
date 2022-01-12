// import { Command, CommandClient } from "detritus-client";
// import { User } from "detritus-client/lib/structures";
// import { DefaultParameters, Parameters } from "../../../functions/parameters";
// import { messages } from "../../../messages";
// import { BaseCommand } from "../basecommand";
// export interface SudoArgs {
//   as: User;
//   command: Command.Command;
//   args: string;
// }
// export default class SudoCommand extends BaseCommand {
//   constructor(client: CommandClient) {
//     super(client, {
//       name: "sudo",

//       onBefore: (context) => context.user.isClientOwner,
//       onCancel: (context) =>
//         context.editOrReply(messages.permissions.missing_dev),
//       onError: (_context, _args, error) => console.error(error),

//       label: "command",
//       type: Parameters.command,
//       required: true,

//       args: [
//         { name: "as", type: Parameters.user, default: DefaultParameters.user },
//         { name: "args", type: "string", consume: true },
//       ],
//     });
//   }
//   async run(context: Command.Context, args: SudoArgs) {
//     args.command.run!(Object.assign(context, { user: args.as }), args.args);
//   }
// }
