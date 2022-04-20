import { Context } from "detritus-client/lib/command";
import { Member } from "detritus-client/lib/structures";
import { IO } from "wilson-kv";
import { KV } from "../globals";
import { Err } from "./error";

export class Prefixes {
  public id: string;
  constructor(context: Context, ignore: boolean = false) {
    this.id = context.guildId!;
    if (!ignore && !this.can(context.member!)) {
      throw new Err("Not Authorized", { status: 403 });
    }
  }
  get kv() {
    return KV.prefixes;
  }
  get prefixes() {
    return new Set(this.kv.get<Array<string>>(this.id));
  }
  public can(member: Member) {
    return member.canManageGuild || member.isClientOwner;
  }
  exec(method: IO<Set<string>>) {
    this.kv.exec((data) => {
      const entry = data[this.id] as Array<string>;
      data[this.id] = Array.from(
        method(new Set(entry || this.kv.get<Array<string>>("global")!))
      );
      return data;
    });
    return this;
  }
  has(prefix: string) {
    return this.prefixes.has(prefix);
  }
  add(prefix: string) {
    this.exec((prefixes) => {
      return prefixes.add(prefix);
    });
  }
  delete(prefix: string) {
    this.exec((prefixes) => {
      prefixes.delete(prefix);
      return prefixes;
    });
    if (!this.prefixes.size) {
      this.kv.delete(this.id);
    }
  }
}
