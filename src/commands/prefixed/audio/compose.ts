// import { CommandClient } from "detritus-client";
// import { AudioMetadata } from "../../../tools/command-metadata";
// import { Formatter } from "../../../tools/formatter";
// import { Parameters } from "../../../tools/parameters";
// import { BaseAudioCommand } from "../basecommand";

// export default class AudioVolumeCommand extends BaseAudioCommand {
//   constructor(client: CommandClient) {
//     super(client, {
//       name: "audio",
//       priority: -1,
//       metadata: AudioMetadata("set volume", "<target: Audio> <...args: any>"),
//       args: [
//         {
//           name: "volume",
//           type: Parameters.number(),
//           required: false,
//         },
//         {
//           name: "pitch",
//           type: Parameters.number(),
//           required: false,
//         },
//       ],
//     });
//   }

//   run = Formatter.Audio.compose;
// }
