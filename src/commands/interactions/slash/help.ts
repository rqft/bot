// import { InteractionContext } from "detritus-client/lib/interaction";
// import { Parameters } from "../../../functions/parameters";
// import { BaseCommand } from "../../prefixed/basecommand";
// import { BaseInteractionCommand } from "../baseinteraction";

// export default class HelpCommand extends BaseInteractionCommand {
//     name = "help"
//     description = "Get help on a command"
//     constructor() {
//         super({
//             options: [
//                 {
//                     name: "command",
//                     description: "Command",
//                     value: Parameters.command,
//                     required: true,
//                     onAutoComplete: Parameters.Interactions.Autcomplete.command,
//                 },
//             ],
//         });
//     }

//     run(context: InteractionContext, args: { command: BaseCommand }) {}
// }
