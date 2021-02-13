import { config } from "../config";
import { IconElement } from "../interfaces/element";

const botBadgeMap = new Map<string, IconElement[]>();
config.bot.ownerIds.forEach((e) => {
  botBadgeMap.set(e, [
    {
      icon: "<:IconGui_OwnerCrown:799657143719952415>",
      text: "Bot Owner",
    },
    {
      icon: "<:GitHub:805634226921013258>",
      text: "Github Person",
    },
  ]);
});
botBadgeMap.set(
  config.bot.application.ownerId,
  botBadgeMap.get(config.bot.application.ownerId)!.concat([
    {
      icon: ":technologist:",
      text: "Developer",
    },
  ])
);
botBadgeMap.set(config.bot.id, [
  {
    icon: "<:Hallucinate:800092998590529557>",
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
    icon: ":+1:",
    text: "ok",
  },
]);
botBadgeMap.set("706159423323635782", [
  {
    icon: ":droplet:",
    text: "funy watr person",
  },
]);
export { botBadgeMap };
