import { IElement } from "../types";
import { CustomEmojis } from "./customEmojis";
import { PresenceStatusUnion } from "./utils";

const UserStatusMap = new Map<PresenceStatusUnion, IElement>();
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
