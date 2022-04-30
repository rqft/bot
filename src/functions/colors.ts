import { Permissions } from "detritus-client/lib/constants";
import { Guild, Member } from "detritus-client/lib/structures";
import { IO, Wilson } from "wilson-kv";
import { KV } from "../globals";
import { Err } from "./error";

export class Colors {
  public guild: Guild;
  public kv: Wilson = KV.colors;
  public member: Member;
  private ignoreMember: boolean;
  constructor(guild: Guild, member: Member, ignoreMember: boolean = false) {
    this.guild = guild;
    this.member = member;
    this.ignoreMember = ignoreMember;
  }
  exec(io: IO<Array<string>>) {
    return this.kv.exec((data) => {
      data[this.guild.id] = io(data[this.guild.id] as Array<string>);
      return data;
    });
  }
  get roles() {
    return this.kv.get<Array<string>>(this.guild.id) || [];
  }
  can() {
    return (
      this.guild.me &&
      this.guild.me.can(Permissions.MANAGE_ROLES) &&
      (this.ignoreMember || this.member.can(Permissions.MANAGE_ROLES))
    );
  }
  async create(name: string, color: number) {
    if (await this.get(name)) {
      throw new Err(`Color ${name} already exists`, { status: 409 });
    }
    if (!this.can()) {
      throw new Err("Cannot manage colors", { status: 403 });
    }
    const role = await this.guild.createRole({
      name,
      color,
    });
    this.exec((data) => {
      data.push(role.id);
      return data;
    });
    return this;
  }
  async delete(name: string) {
    if (!this.can()) {
      return;
    }
    const role = await this.get(name);
    if (!role) {
      return;
    }
    this.exec((data) => {
      data.splice(data.indexOf(role.id), 1);
      return data;
    });
    return this;
  }
  async get(name: string) {
    if (!this.can()) {
      return;
    }
    const role = this.guild.roles.find((role) => role.name === name);
    if (!role) {
      return;
    }
    return role;
  }
  async apply(name: string, member: Member) {
    if (member.guildId !== this.guild.id) {
      return;
    }
    const role = await this.get(name);
    if (!role) {
      return;
    }
    if (!this.can()) {
      throw new Err("Cannot manage colors", { status: 403 });
    }
    member.addRole(role.id);
    return this;
  }
  async remove(name: string, member: Member) {
    if (member.guildId !== this.guild.id) {
      return;
    }
    const role = await this.get(name);
    if (!role) {
      return;
    }
    if (!this.can()) {
      throw new Err("Cannot manage colors", { status: 403 });
    }
    member.removeRole(role.id);
    return this;
  }
  async set(name: string, member: Member) {
    if (member.guildId !== this.guild.id) {
      return;
    }
    const role = await this.get(name);
    if (!role) {
      return;
    }
    if (!this.can()) {
      throw new Err("Cannot manage colors", { status: 403 });
    }
    if (member.roles.has(role.id)) {
      throw new Err("Member already has this color", { status: 409 });
    }
    const existing = member.roles.find((v) => this.roles.includes(v!.id));
    if (existing) {
      member.removeRole(existing.id);
    }
    member.addRole(role.id);
    return this;
  }
  async current(member: Member) {
    if (member.guildId !== this.guild.id) {
      return;
    }
    const role = member.roles.find((v) => this.roles.includes(v!.id));
    if (!role) {
      return;
    }
    return role;
  }
}
