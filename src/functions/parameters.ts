import { Context } from "detritus-client/lib/command";
import { altclients, client, selfclient } from "../globals";
const all = [client, ...altclients, selfclient]
  .map((v) => v.users.toArray())
  .flat(1);
export namespace Parameters {
  export function user(value: string, _context: Context) {
    const found = all.find((key) => {
      return (
        key.username.toLowerCase().includes(value) ||
        key.toString().toLowerCase() === value ||
        key.id === value.replace(/\D/g, "")
      );
    });
    return found;
  }
}
export namespace DefaultParameters {
  export function user(context: Context) {
    return context.user;
  }
}
