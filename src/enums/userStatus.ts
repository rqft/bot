import { IElement } from "../interfaces/IElement";
import { CustomEmojis } from "./customEmojis";

const UserStatusMap = new Map<
  "online" | "idle" | "dnd" | "offline" | "invisible",
  IElement
>();
UserStatusMap.set("dnd", {
  icon: CustomEmojis.STATUS_DND,
  text: "Busy",
});
UserStatusMap.set("idle", {
  icon: CustomEmojis.STATUS_IDLE,
  text: "Idle",
});
UserStatusMap.set("offline", {
  icon: CustomEmojis.STATUS_OFFLINE,
  text: "Offline",
});
UserStatusMap.set("invisible", {
  icon: CustomEmojis.STATUS_OFFLINE,
  text: "Offline",
});
UserStatusMap.set("online", {
  icon: CustomEmojis.STATUS_ONLINE,
  text: "Online",
});
export { UserStatusMap };
