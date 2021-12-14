import { Command, CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";
export interface GDLeaderboardArgs {
  userId: string;
}
export default class GDLeaderboardCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "gprofile",

      label: "userId",
      required: true,
      type: "string",
    });
  }
  async run(context: Command.Context, args: GDLeaderboardArgs) {}
}
