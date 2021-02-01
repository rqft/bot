import { config } from "../config";
import { IconElement } from "../handlers/element";

const botBadgeMap = new Map<string, IconElement[]>();
config.bot.ownerIds.forEach((e) => {
  botBadgeMap.set(e, [
    {
      icon: "<:IconGui_OwnerCrown:799657143719952415>",
      text: "Bot Owner",
    },
  ]);
});
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
export { botBadgeMap };
