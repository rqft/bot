const UserStatusMap = new Map<
  "online" | "idle" | "dnd" | "offline" | "invisible",
  { icon: string; text: string }
>();
UserStatusMap.set("dnd", {
  icon: "<:IconStatus_Dnd:798624244669087805>",
  text: "Busy",
});
UserStatusMap.set("idle", {
  icon: "<:IconStatus_Idle:798624247295246336>",
  text: "Idle",
});
UserStatusMap.set("offline", {
  icon: "<:IconStatus_Offline:798624247546511370>",
  text: "Offline",
});
UserStatusMap.set("invisible", {
  icon: "<:IconStatus_Offline:798624247546511370>",
  text: "Offline",
});
UserStatusMap.set("online", {
  icon: "<:IconStatus_Online:798624246728228874>",
  text: "Online",
});
export { UserStatusMap };
