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
  public async levels(
    levelId: string,
    download: boolean = false
  ): Promise<
    | (LevelResult & Partial<LevelSpecialResult>)
    | (LevelResult & LevelDownloadedResult & Partial<LevelSpecialResult>)
    | -1
  > {
    return this.raw.getJSON(
      "/api/level/" + levelId + this.raw.toUrlParams({ download })
    );
  }
}
