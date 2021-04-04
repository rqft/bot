export interface IDeploy {
  app_id: null | string;
  script_id: string;
  last_updated_at: null | any;
  disabled: boolean;
  id: string;
  bot_id: string;
  guild_id: string;
  type: number;
  status: number;
  name: string;
  config: string;
  revision: number;
}
export interface ICronTask {
  name: string;
  cronString: string;
}
