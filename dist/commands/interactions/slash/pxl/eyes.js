"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PxlEyesSlashSubCommand = void 0;
const fetch_1 = require("@rqft/fetch");
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const baseslash_1 = require("../baseslash");
class PxlEyesSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "eyes";
    description = "THEY SEE YOU RUNNING";
    constructor() {
        super({
            options: [
                new baseslash_1.BaseImageOption(),
                {
                    name: "type",
                    description: "what eyes",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    autocomplete: true,
                    onAutoComplete: parameters_1.Parameters.Autocomplete.choices(Object.values(fetch_1.APIs.PxlAPI.Eyes)),
                },
            ],
        });
    }
    run = formatter_1.Formatter.Pxl.eyes;
}
exports.PxlEyesSlashSubCommand = PxlEyesSlashSubCommand;
