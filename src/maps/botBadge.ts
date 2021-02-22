import { config } from "../config";
import { IconElement } from "../interfaces/element";
import { CustomEmojis } from "./customEmojis";
import { decor } from "./emojiEnum";

const botBadgeMap = new Map<string, IconElement[]>();
config.bot.ownerIds.forEach((e) => {
  botBadgeMap.set(e, [
    {
      icon: CustomEmojis.GUI_OWNERCROWN,
      text: "Global Admin",
    },
  ]);
});
const githubPeople = ["504698587221852172", "533757461706964993"];
githubPeople.forEach((e) => {
  botBadgeMap.set(
    e,
    botBadgeMap.get(e)!.concat([
      {
        icon: CustomEmojis.ICON_GITHUB,
        text: "Github Person",
      },
    ])
  );
});
botBadgeMap.set(
  config.bot.application.ownerId,
  botBadgeMap.get(config.bot.application.ownerId)!.concat([
    {
      icon: decor.Emojis.TECHNOLOGIST,
      text: "Developer",
    },
  ])
);
botBadgeMap.set(config.bot.id, [
  {
    icon: CustomEmojis.BOT_HALLUCINATE,
    text: "System",
  },
]);
botBadgeMap.set("697071919639560254", [
  {
    icon: "<:mejiIsACutieAndHeCantDenyIt:805630177475559444>",
    text: "Cute",
  },
]);
botBadgeMap.set("411994935395614761", [
  {
    icon: decor.Emojis["_+1"],
    text: "ok",
  },
]);
botBadgeMap.set("706159423323635782", [
  {
    icon: decor.Emojis.DROPLET,
    text: "funy watr person",
  },
]);
export { botBadgeMap };
