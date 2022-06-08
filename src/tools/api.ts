import { sleep } from "detritus-utils/lib/timers";
import FormData from "form-data";
import fetch from "node-fetch";
import { APIs, Pariah } from "pariah";

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

export class Sarah extends APIs.Jonathan.API {
  url = new URL("http://localhost:3000");
}

export module Waifu2x {
  export const Url = new URL("https://api.alcaamado.es/api/");

  export interface Hash {
    hash: string;
  }

  export interface Check {
    finished: true;
    size: 0;
  }

  export class API extends Pariah {
    constructor() {
      super(Url);
    }

    public async convert(data: Buffer) {
      const form = new FormData();

      form.append("denoise", 1);
      form.append("scale", "true");
      form.append("file", data, {
        filename: "result.png",
        contentType: "image/png",
      });

      return await this.post.json<Hash>(
        "/v1/waifu2x/convert",
        {},
        {
          body: form,
        }
      );
    }

    public async grab(hash: string, type = "png") {
      return await this.get.buffer("/v2/waifu2x/get", {
        hash,
        type,
      });
    }

    public async check(hash: string) {
      return await this.get.json<Check>("/v2/waifu2x/check", {
        hash,
      });
    }

    public async use(url: string, type = "png") {
      const data = await fetch(url);
      const buffer = await data.buffer();
      const hash = await this.convert(buffer);

      let finished = false;
      while (!finished) {
        const check = await this.check(hash.payload.hash);
        finished = check.payload.finished;
        console.log(check.payload);
        await sleep(1000);
      }

      return await this.grab(hash.payload.hash, type);
    }
  }
}
