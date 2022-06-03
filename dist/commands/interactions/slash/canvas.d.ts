import { BaseSlashCommand } from "./baseslash";
export default class CanvasSlashCommand extends BaseSlashCommand {
    name: string;
    description: string;
    constructor();
    run: typeof import("../../../tools/format/some-random-api").SomeRandomApi.canvas;
}
