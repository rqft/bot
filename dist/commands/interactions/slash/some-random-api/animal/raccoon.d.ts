import { BaseSlashSubCommand } from "../../baseslash";
export declare class AnimalRaccoonSlashSubCommand extends BaseSlashSubCommand {
    name: string;
    description: string;
    run: (context: import("detritus-client/lib/command").Context | import("detritus-client/lib/interaction").InteractionContext) => Promise<import("detritus-client/lib/structures").Message | null>;
}
