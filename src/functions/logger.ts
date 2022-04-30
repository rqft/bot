import chalk from "chalk";
import {
  CommandClient,
  GatewayClientEvents,
  ShardClient,
} from "detritus-client";
import { CommandEvents } from "detritus-client/lib/command";
import { ClientEvents } from "detritus-client/lib/constants";
import { Guild, User } from "detritus-client/lib/structures";
export class Logger {
  public client: CommandClient;
  public shard: ShardClient;
  public birth: Date = new Date();
  constructor(client: CommandClient | ShardClient) {
    this.shard =
      client instanceof CommandClient ? (client.client as ShardClient) : client;
    this.client =
      client instanceof CommandClient ? client : new CommandClient(client);
  }

  public logRaw(
    title: string,
    color: Array<keyof chalk.Chalk> | keyof chalk.Chalk,
    ...text: Array<any>
  ): this {
    if (!Array.isArray(color)) {
      color = [color];
    }
    let callee: any = chalk;
    for (const c of color) {
      callee = callee[c];
    }

    console.log(callee(title), ...text);
    return this;
  }

  public log(
    title: string,
    color: Array<keyof chalk.Chalk> | keyof chalk.Chalk,
    ...text: Array<any>
  ): this {
    return this.logRaw(
      title,
      color,
      user(this.shard.user!),
      text.length ? "-" : "",
      ...text
    );
  }

  public ready(): this {
    return this.log(
      "Ready",
      ["green", "bold"],
      chalk.dim.grey(`within ${Date.now() - +this.birth}ms`)
    );
  }

  public guildCreate(payload: GatewayClientEvents.GuildCreate) {
    if (payload.fromUnavailable) {
      return this.log(
        "Guilds > Available",
        ["green", "bold"],
        guild(payload.guild)
      );
    }
    return this.log("Guilds > Added", ["green", "bold"], guild(payload.guild));
  }

  public guildDelete(payload: GatewayClientEvents.GuildDelete) {
    return this.log(
      "Guilds > Removed",
      ["red", "bold"],
      payload.guild ? guild(payload.guild) : payload.guildId
    );
  }

  public commandRan(payload: CommandEvents.CommandRan) {
    return this.logRaw(
      "Commands > Ran",
      ["yellow", "bold"],
      user(payload.context.user),
      "used",
      chalk.yellow(payload.command.fullName)
    );
  }

  public commandDelete(payload: CommandEvents.CommandDelete) {
    return this.logRaw(
      "Commands > Delete",
      ["red", "bold"],
      user(payload.context.user),
      "deleted",
      chalk.red(payload.command.fullName)
    );
  }

  public commandError(payload: CommandEvents.CommandError) {
    return this.logRaw(
      "Commands > Error",
      ["red", "bold"],
      user(payload.context.user),
      "threw",
      chalk.red(payload.error.message),
      "in",
      chalk.red(payload.command.fullName)
    );
  }

  public commandFail(payload: CommandEvents.CommandFail) {
    return this.logRaw(
      "Commands > Fail",
      ["red", "bold"],
      user(payload.context.user),
      "failed",
      chalk.red(payload.error.message),
      "in",
      chalk.red(payload.command.fullName)
    );
  }

  public commandPermissionsFail(payload: CommandEvents.CommandPermissionsFail) {
    return this.logRaw(
      "Commands > Permissions Fail",
      ["red", "bold"],
      user(payload.context.user),
      "failed to match permissions for",
      chalk.red(payload.command.fullName)
    );
  }

  public commandPermissionsFailClient(
    payload: CommandEvents.CommandPermissionsFailClient
  ) {
    return this.logRaw(
      "Commands > Permissions Error (Client)",
      ["red", "bold"],
      user(this.shard.user!),
      "failed to match permissions for",
      chalk.red(payload.command.fullName)
    );
  }

  public commandRatelimit(payload: CommandEvents.CommandRatelimit) {
    return this.logRaw(
      "Commands > Ratelimit",
      ["red", "bold"],
      user(payload.context.user),
      "hit",
      payload.global ? "global" : "local",
      "ratelimit for",
      chalk.red(payload.command.fullName)
    );
  }

  public commandResponseDelete(payload: CommandEvents.CommandResponseDelete) {
    return this.logRaw(
      "Commands > Response Delete",
      ["red", "bold"],
      user(payload.context.user),
      "deleted response for",
      chalk.red(payload.command.fullName)
    );
  }

  public commandRunError(payload: CommandEvents.CommandRunError) {
    return this.logRaw(
      "Commands > Run Error",
      ["red", "bold"],
      user(payload.context.user),
      "threw",
      chalk.red(payload.error.message),
      "in",
      chalk.red(payload.command.fullName)
    );
  }

  public guildLoaded(payload: Guild) {
    return this.logRaw("Guilds > Loaded", ["green", "bold"], guild(payload));
  }
  public attach() {
    this.ready();
    this.shard.on(ClientEvents.GUILD_CREATE, this.guildCreate.bind(this));
    this.shard.on(ClientEvents.GUILD_DELETE, this.guildDelete.bind(this));

    this.client.on(ClientEvents.COMMAND_RAN, this.commandRan.bind(this));
    this.client.on(ClientEvents.COMMAND_DELETE, this.commandDelete.bind(this));
    this.client.on(ClientEvents.COMMAND_ERROR, this.commandError.bind(this));
    this.client.on(ClientEvents.COMMAND_FAIL, this.commandFail.bind(this));
    this.client.on(
      ClientEvents.COMMAND_PERMISSIONS_FAIL,
      this.commandPermissionsFail.bind(this)
    );
    this.client.on(
      ClientEvents.COMMAND_PERMISSIONS_FAIL_CLIENT,
      this.commandPermissionsFailClient.bind(this)
    );
    this.client.on(
      ClientEvents.COMMAND_RATELIMIT,
      this.commandRatelimit.bind(this)
    );
    this.client.on(
      ClientEvents.COMMAND_RESPONSE_DELETE,
      this.commandResponseDelete.bind(this)
    );
    this.client.on(
      ClientEvents.COMMAND_RUN_ERROR,
      this.commandRunError.bind(this)
    );

    if (this.shard.isBot) {
      this.shard.guilds.forEach(this.guildLoaded.bind(this));
    }
    return this;
  }
}
function guild(payload: Guild) {
  return `${payload.name} ${chalk.grey(`(${payload.id})`)}`;
}
function user(payload: User) {
  return `${payload.tag} ${chalk.grey(`(${payload.id})`)}`;
}
