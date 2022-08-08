"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PxlSnapchatSlashSubCommand = void 0;
const fetch_1 = require("@rqft/fetch");
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const baseslash_1 = require("../baseslash");
class PxlSnapchatSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "snapchat";
    description = "teenage white girl named brittany uses this";
    constructor() {
        super({
            options: [
                new baseslash_1.BaseImageOption(),
                {
                    name: "filter",
                    description: "what to use with",
                    autocomplete: true,
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    onAutoComplete: parameters_1.Parameters.Autocomplete.choices(Object.values(fetch_1.APIs.PxlAPI.SnapchatFilters)),
                },
            ],
        });
    }
    run = formatter_1.Formatter.Pxl.snapchat;
}
exports.PxlSnapchatSlashSubCommand = PxlSnapchatSlashSubCommand;
