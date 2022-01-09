// https://gdbrowser.com/icon/
import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { Image } from "imagescript";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import {
  GDBrowser,
  IconForm,
  ProfileAvailabilityString,
  ProfileModeratorStatus,
  ProfileModeratorString,
  ProfileResult,
} from "../../../functions/gdbrowser";
import { storeImage } from "../../../functions/tools";
import { BaseCommand } from "../basecommand";
export interface GDProfileArgs {
  userId: string;
}
export default class GDProfileCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "gprofile",

      label: "userId",
      required: true,
      type: "string",
    });
  }
  async run(context: Command.Context, args: GDProfileArgs) {
    let gd = new GDBrowser();
    let profile = await gd.profiles(args.userId);
    if (profile === -1) {
      return context.editOrReply("that isnt a user");
    }
    let embed = createBrandEmbed(Brand.GD_BROWSER, context);
    embed.setTitle(`${profile.username}'s Profile`);
    {
      const description: Array<string> = [];
      description.push(`**Player ID:** ${Markup.codestring(profile.playerID)}`);
      description.push(
        `**-> Account ID:** ${Markup.codestring(profile.accountID)}`
      );
      description.push(`**Global Rank:** ${profile.rank}`);
      if (profile.moderator !== ProfileModeratorStatus.NONE) {
        description.push(
          `**Moderator Status:** ${ProfileModeratorString[profile.moderator]}`
        );
      }

      {
        const socials: Array<string> = [];
        if (profile.twitter) {
          socials.push(
            `-> **Twitter:** [${profile.twitter}](https://twitter.com/${profile.twitter})`
          );
        }
        if (profile.youtube) {
          socials.push(
            `-> **Youtube:** [${profile.youtube}](https://youtube.com/channel/${profile.youtube})`
          );
        }
        if (profile.twitch) {
          socials.push(
            `-> **Twitch:** [${profile.twitch}](https://twitch.tv/${profile.twitch})`
          );
        }
        if (socials.length) {
          description.push(`\n**Socials**`);
          description.push(socials.join("\n"));
        }
      }

      embed.setDescription(description.join("\n"));
    }
    {
      const stats: Array<string> = [];
      stats.push(`**Stars:** ${profile.stars}`);
      stats.push(`**Diamonds:** ${profile.diamonds}`);
      stats.push(`**Secret Coins:** ${profile.coins}`);
      stats.push(`**User Coins**: ${profile.userCoins}`);
      stats.push(`**Demons Completed:** ${profile.demons}`);
      stats.push(`**Creator Points:** ${profile.cp}`);
      embed.addField("Stats", stats.join("\n"));
    }
    {
      const settings: Array<string> = [];
      settings.push(
        `**Friend Requests:** ${
          profile.friendRequests ? "Enabled" : "Disabled"
        }`
      );
      settings.push(
        `**Messages:** ${ProfileAvailabilityString[profile.messages]}`
      );
      settings.push(
        `**Comment History** ${
          ProfileAvailabilityString[profile.commentHistory]
        }`
      );

      embed.addField("Settings", settings.join("\n"));
    }
    embed.setThumbnail(`https://gdbrowser.com/icon/${profile.playerID}`);

    // i hate
    const iconSet = await composeIconSet(profile);
    const iconSetUrl = await storeImage(
      iconSet,
      `icons_${profile.playerID}.png`
    );
    embed.setImage(iconSetUrl.url!);
    context.editOrReply({ embed });
  }
}
async function composeIconSet(profile: ProfileResult) {
  const forms: IconForm[] = [
    IconForm.CUBE,
    IconForm.SHIP,
    IconForm.BALL,
    IconForm.UFO,
    IconForm.WAVE,
    IconForm.ROBOT,
    IconForm.SPIDER,
    IconForm.SWING,
  ];
  let gd = new GDBrowser();
  const icons: Array<ArrayBuffer> = await Promise.all(
    forms.map((form) => {
      return gd.icon(profile.playerID, form);
    })
  );
  let composite = new Image(128 * forms.length, 128);
  icons.forEach(async (icon, index) => {
    let img = await Image.decode(Buffer.from(icon));
    composite.composite(img, 128 * index, 0);
  });
  return Buffer.from(await composite.encode());
}
