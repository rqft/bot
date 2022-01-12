import { GatewayPresenceStatuses } from "detritus-client-socket/lib/constants";
import { IElement } from "../types";
import { CustomEmojis } from "./customEmojis";

const UserStatusMap = new Map<GatewayPresenceStatuses, IElement>();
UserStatusMap.set(GatewayPresenceStatuses["DND"], {
  icon: CustomEmojis.STATUS_DND,
  text: "Busy",
});
UserStatusMap.set(GatewayPresenceStatuses["IDLE"], {
  icon: CustomEmojis.STATUS_IDLE,
  text: "Idle",
});
UserStatusMap.set(GatewayPresenceStatuses["OFFLINE"], {
  icon: CustomEmojis.STATUS_OFFLINE,
  text: "Offline",
});
UserStatusMap.set(GatewayPresenceStatuses["INVISIBLE"], {
  icon: CustomEmojis.STATUS_OFFLINE,
  text: "Invisible",
});
UserStatusMap.set(GatewayPresenceStatuses["ONLINE"], {
  icon: CustomEmojis.STATUS_ONLINE,
  text: "Online",
});
export { UserStatusMap };
