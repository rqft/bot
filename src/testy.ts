import { ShardClient } from "detritus-client";
import { Member } from "detritus-client/lib/structures";
export interface WelcomersOptions {
  tokens: Array<string | ShardClient>;
  guildId: string;
  channelId: string;
  message: (member: Member) => string;
  status: string;
  master: string | ShardClient;
}
export class Welcomers {
  public main: ShardClient;
  public clients: Array<ShardClient>;
  public guildId: string;
  public channelId: string;
  public message: (member: Member) => string;
  public status: string;
  constructor(options: WelcomersOptions) {
    this.main =
      options.master instanceof ShardClient
        ? options.master
        : new ShardClient(options.master);
    this.clients = options.tokens.map(
      (token) =>
        new ShardClient(token instanceof ShardClient ? token.token : token)
    );
    if (!this.clients.length) {
      throw new Error("you need some valid tokens bro");
    }
    this.guildId = options.guildId;
    this.channelId = options.channelId;
    this.message = options.message;
    this.status = options.status;
  }

  async exec(io: (payload: ShardClient) => ShardClient) {
    this.clients.forEach(io);
    return this;
  }
  get(id: string = this.main.userId) {
    const client = [...this.clients, this.main].find(
      (client) => client.userId === id
    );
    if (!client) {
      throw new Error("client not found");
    }
    return client;
  }
  guild(id: string = this.main.userId) {
    const payload = this.get(id).guilds.get(this.guildId);
    if (!payload) {
      throw new Error("invalid guild id");
    }
    return payload;
  }
  channel(id: string = this.main.userId) {
    const payload = this.guild(id).textChannels.get(this.channelId);
    if (!payload) {
      throw new Error("invalid channel id");
    }
    return payload;
  }
  async sendWith(id: string, content: string) {
    return this.channel(id).createMessage(content);
  }
  async send(content: string) {
    return this.exec((client) => {
      this.sendWith(client.userId, content);
      return client;
    });
  }
  attach() {
    return this.exec((client) => {
      client.gateway.setPresence({
        status: this.status,
      });
      client.on("guildMemberAdd", (payload) => {
        this.send(this.message(payload.member));
      });
      return client;
    });
  }
}
new Welcomers({
  channelId: "",
  guildId: "",
  message: (member) => `@everyone ${member.mention} joined :)`,
  status: "walking",
  tokens: [],
  master: "",
}).attach();
