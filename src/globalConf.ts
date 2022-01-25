import {
  CommandClient,
  InteractionCommandClient,
  ShardClient,
} from "detritus-client";
import { RestEvents } from "detritus-client-rest/lib/constants";
import { ClientEvents } from "detritus-client/lib/constants";
import { Channel } from "detritus-client/lib/structures";

const clientBase = new ShardClient("token");

const client = {
  rest: clientBase.rest,
  gateway: clientBase.gateway,
  interactions: new InteractionCommandClient(clientBase),
  commands: new CommandClient(clientBase),
  self: clientBase,
};
enum GatewayEvents {
  CLOSE = "close",
  KILLED = "killed",
  OPEN = "open",
  PACKET = "packet",
  READY = "ready",
  SOCKET = "socket",
  STATE = "state",
  WARN = "warn",
}

const config = {
  channels: [{ id: "", events: ["*", "commands/*"] }],
};
function eventMatches(
  event: ClientEvents | RestEvents | GatewayEvents,
  from: string = "self",
  match: Array<string>
): boolean {
  if (match.length === 0) return false;
  if (match.includes("*")) return true;
  if (match.includes(`${from}/*`)) return true;
  return match.includes(`${from}/${event}`);
}

type Events = ClientEvents | RestEvents | GatewayEvents;
type From = "self" | "rest" | "gateway" | "commands" | "interactions";
type Event = `${From}/${Events}`;
function channel(event: string): Array<Channel> {
  let [from, eventName] = event.split("/");
  if (!eventName || !from) throw new Error("invalid event");
  const channels = config.channels.filter((c) =>
    eventMatches(eventName!, from, c.events)
  );
  return channels.map((c) => client.self.channels.get(c.id) as Channel);
}
