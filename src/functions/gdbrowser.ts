import { Pariah } from "pariah";
export type LevelLength = "Tiny" | "Short" | "Medium" | "Long" | "XL";
export type LevelDifficulty =
  | "Unrated"
  | "Auto"
  | "Easy"
  | "Normal"
  | "Hard"
  | "Harder"
  | "Insane"
  | "Easy Demon"
  | "Medium Demon"
  | "Hard Demon"
  | "Insane Demon"
  | "Extreme Demon";
export interface LevelResult {
  name: string;
  id: string;
  description: string;
  author: string;
  playerID: string;
  accountID: string;
  difficulty: LevelDifficulty;
  downloads: number;
  likes: number;
  disliked: false;
  length: LevelLength;
  stars: number;
  orbs: number;
  diamonds: number;
  featured: boolean;
  epic: boolean;
  gameVersion: string;
  editorTime: number;
  totalEditorTime: number;
  version: number;
  copiedID: string;
  twoPlayer: false;
  officialSong: number;
  customSong: number;
  coins: 0 | 1 | 2 | 3;
  verifiedCoins: boolean;
  starsRequested: number;
  ldm: boolean;
  objects: number;
  large: false;
  cp: number;
  difficultyFace: string;
  songName: string;
  songAuthor: string;
  songSize: string;
  songID: number | `Level ${number}`;
  songLink?: string;
  demonList?: number;
}
export interface LevelDownloadedResult {
  uploaded: string;
  updated: string;
  password: string;
  editorTime: number;
  totalEditorTime: number;
  ldm: boolean;
  extraString: unknown;
  data: string;
}
export interface LevelSpecialResult {
  weekly: boolean;
  dailyNumber: number;
  nextDaily: number;
  nextDailyTimestamp: number;
}
export enum ProfileAvailability {
  ALL = "all",
  FRIENDS = "friends",
  OFF = "off",
}
export const ProfileAvailabilityString = {
  [ProfileAvailability.ALL]: "All",
  [ProfileAvailability.FRIENDS]: "Friends",
  [ProfileAvailability.OFF]: "Disabled",
};

export enum ProfileModeratorStatus {
  NONE = 0,
  MODERATOR = 1,
  ELDER_MODERATOR = 2,
}
export const ProfileModeratorString = {
  [ProfileModeratorStatus.NONE]: "None",
  [ProfileModeratorStatus.MODERATOR]: "Moderator",
  [ProfileModeratorStatus.ELDER_MODERATOR]: "Elder Moderator",
};
export interface ProfileResult {
  username: string;
  playerID: string;
  accountID: string;
  rank: number;
  stars: number;
  diamonds: number;
  coins: number;
  userCoins: number;
  demons: number;
  cp: number;
  friendRequests: boolean;
  messages: ProfileAvailability;
  commentHistory: ProfileAvailability;
  moderator: ProfileModeratorStatus;
  youtube?: string;
  twitter?: string;
  twitch?: string;
  glow: boolean;
  icon: number;
  ship: number;
  ball: number;
  ufo: number;
  wave: number;
  robot: number;
  spider: number;
  col1: number;
  col2: number;
  deathEffect: number;
}
export enum IconForm {
  CUBE = "cube",
  SHIP = "ship",
  BALL = "ball",
  UFO = "ufo",
  WAVE = "wave",
  ROBOT = "robot",
  SPIDER = "spider",
  SWING = "swing",
  CURSED = "cursed",
}
export interface LeaderboardResult {
  rank: number;
  username: string;
  playerID: string;
  stars: number;
  demons: number;
  cp: number;
  coins: number;
  usercoins: number;
  diamonds: number;
  icon: {
    form: IconForm | "icon";
    icon: number;
    col1: number;
    col2: number;
    glow: boolean;
  };
}

export class GDBrowser {
  public raw: Pariah;
  constructor() {
    this.raw = new Pariah({
      baseUrl: "https://gdbrowser.com",
    });
  }
  public async levels(
    levelId: string,
    download: true
  ): Promise<
    (LevelResult & LevelDownloadedResult & Partial<LevelSpecialResult>) | -1
  >;
  public async levels(
    levelId: string,
    download: false
  ): Promise<(LevelResult & Partial<LevelSpecialResult>) | -1>;
  public async levels(levelId: string, download: boolean = false) {
    return this.raw.getJSON<
      | (LevelResult & Partial<LevelSpecialResult>)
      | (LevelResult & LevelDownloadedResult & Partial<LevelSpecialResult>)
      | -1
    >("/api/level/" + levelId + this.raw.toUrlParams({ download }));
  }
  public async profiles(user: string) {
    return this.raw.getJSON<ProfileResult | -1>("/api/profile/" + user);
  }
  public async icon(
    user: string,
    form: IconForm = IconForm.CUBE,
    size: number = 128
  ) {
    return this.raw.getArrayBuffer(
      "/icon/" + user + this.raw.toUrlParams({ form, size })
    );
  }
  public async leaderboard(
    count: number = 100,
    type: { creator: boolean; accuracy: boolean } = {
      creator: false,
      accuracy: false,
    }
  ) {
    return this.raw.getJSON<LeaderboardResult[] | -1>(
      "/api/leaderboard/" + this.raw.toUrlParams({ count, ...type })
    );
  }
}
