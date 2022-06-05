import { Pariah } from "pariah";

export module YoutubeSearch {
  export const Url = new URL("https://youtube.googleapis.com/youtube/v3");

  export interface Result {
    kind: string;
    etag: string;
    nextPageToken: string;
    regionCode: string;
    pageInfo: PageInfo;
    items: Array<Item>;
  }

  export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
  }

  export interface Item {
    kind: string;
    etag: string;
    id: Id;
    snippet: Snippet;
  }

  export interface Id {
    kind: string;
    videoId: string;
  }

  export interface Snippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  }

  export interface Thumbnails {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
  }

  export interface Thumbnail {
    url: string;
    width: number;
    height: number;
  }

  export class API extends Pariah {
    public readonly token: string;
    constructor(token: string) {
      super(Url, { headers: { accept: "application/json" } });
      this.token = token;
    }

    public async search(query: string, maxResults = 25) {
      return await this.get.json<Result>("/search", {
        part: ["snippet"],
        q: query,
        maxResults,
        key: this.token,
      });
    }
  }
}
