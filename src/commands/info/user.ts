import { Command, CommandClient } from "detritus-client";
import { HTTPMethods } from "detritus-client-rest/lib/constants";
import { Api } from "detritus-client-rest/lib/endpoints";
import { User } from "detritus-client/lib/structures";
import { Brand } from "../../enums/brands";
import { APIProfile, ConnectionMap, connectionUrls } from "../../enums/utils";
import { createBrandEmbed } from "../../functions/embed";
import { DefaultParameters, Parameters } from "../../functions/parameters";
import { getProfileBadges } from "../../functions/tools";
import globalConf from "../../globalConf";
import { restSelfClient } from "../../globals";
import { BaseCommand } from "../basecommand";
export interface UserArgs {
  user: User;
}
export default class UserCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "user",
      name: "user",
      priority: 4587,
      type: Parameters.user,
      default: DefaultParameters.user,
    });
  }
  async run(context: Command.Context, { user }: UserArgs) {
    const embed = createBrandEmbed(Brand.VYBOSE, context.user);

    embed.setTitle(user.toString()).setUrl(user.jumpLink);

    const profile: APIProfile = await restSelfClient.request({
      route: {
        method: HTTPMethods.GET,
        path: Api.USER_PROFILE,
        params: { userId: user.id },
      },
    });
    console.log(profile);

    const customBadges = globalConf.badges[user.id] ?? [];
    const userBadges = await getProfileBadges(user);
    const userConnections = profile.connected_accounts.filter(
      (v) => v.type.toUpperCase() in connectionUrls
    );
    embed.setDescription(
      [
        customBadges.map((v) => v.icon).join(""),
        userBadges.map((v) => v.icon).join(""),
        userConnections
          .map(
            (v) =>
              `[${ConnectionMap.get(v.type)!.icon}](${connectionUrls[
                v.type.toUpperCase()
              ]!(v)})`
          )
          .join(""),
      ].join("\n")
    );

    context.editOrReply({ embed });
  }
}
