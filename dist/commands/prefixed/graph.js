"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../tools/command-metadata");
const formatter_1 = require("../../tools/formatter");
const parameters_1 = require("../../tools/parameters");
const basecommand_1 = require("./basecommand");
class PingCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "graph",
            aliases: ["plot"],
            metadata: (0, command_metadata_1.ToolsMetadata)("desmos", "<expr: string> ?<-[size|s]: number> <-[splot|thickness|t|sp]: number> ?<-[scale|scalar]: number>"),
            args: [
                {
                    name: "size",
                    aliases: ["s"],
                    default: 512,
                    type: parameters_1.Parameters.number({ min: 0, max: 2048 }),
                },
                {
                    name: "splot",
                    aliases: ["thickness", "t", "sp"],
                    default: 1,
                    type: parameters_1.Parameters.number({ min: 0, max: 10 }),
                },
                {
                    name: "scale",
                    aliases: ["scalar"],
                    default: 10,
                    type: parameters_1.Parameters.number(),
                },
            ],
            type: [{ name: "expr", required: true, type: String }],
        });
    }
    run = formatter_1.Formatter.Image.graph;
}
exports.default = PingCommand;
