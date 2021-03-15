export interface IConfig {
  guildId: string;
  modules: {
    commands: {
      prefixes: string[];
    };
  };
  levels: {
    [a: string]: number;
  };
}
