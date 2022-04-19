import { IO } from "wilson-kv";
import { KV } from "../globals";

export class Prefixes {
  public id: string;
  constructor(id: string | "global") {
    this.id = id;
  }
  get kv() {
    return KV.prefixes;
  }
  get prefixes() {
    return new Set(this.kv.get<Array<string>>(this.id));
  }
  exec(method: IO<Set<string>>) {
    this.kv.exec((data) => {
      const entry = data[this.id] as Array<string>;
      data[this.id] = Array.from(method(new Set(entry || [])));
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
        this.kv.delete(this.id)
    }
  }
}
