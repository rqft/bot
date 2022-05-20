import { Request } from "express";
import { Pariah } from "pariah";
import { Entries } from "wilson-kv";
import { Result } from "../api/models/result";
import { Secrets } from "../secrets";

export module Jonathan {
  export const Uri = new URL(`${Secrets.Host}:${Secrets.Port}`);
  export interface Choice {
    name: string;
    value: string;
  }
  export class API extends Pariah {
    public readonly token: string;
    constructor(token: string) {
      super(Uri, { headers: { Authorization: `Application ${token}` } });
      this.token = token;
    }

    async authorized(): Promise<Result<boolean>> {
      return await this.get.json<Result<boolean>>("/authorized");
    }

    async origin(): Promise<Result<Request["ip"]>> {
      return await this.get.json<Result<Request["ip"]>>("/origin");
    }

    async base64Encode(text: string): Promise<Result<string>> {
      return await this.get.json<Result<string>>("/base64/encode", { text });
    }

    async base64Decode(text: string): Promise<Result<string>> {
      return await this.get.json<Result<string>>("/base64/decode", { text });
    }

    async binaryEncode(text: string): Promise<Result<string>> {
      return await this.get.json<Result<string>>("/binary/encode", { text });
    }

    async binaryDecode(text: string): Promise<Result<string>> {
      return await this.get.json<Result<string>>("/binary/decode", { text });
    }

    async tagGet(key: string): Promise<Result<string>> {
      return await this.get.json<Result<string>>(`/tags/${key}`);
    }

    async tagPost(key: string, value: string): Promise<Result<true>> {
      return await this.post.json<Result<true>>(`/tags/${key}`, { value });
    }

    async tagDelete(key: string): Promise<Result<string>> {
      return await this.delete.json<Result<string>>(`/tags/${key}`);
    }

    async tagList(): Promise<Result<Array<string>>> {
      return await this.get.json<Result<Array<string>>>("/tags/list");
    }

    async tagInspect(): Promise<Result<Entries>> {
      return await this.get.json<Result<Entries>>("/tags/inspect");
    }

    async tagSearch(query?: string): Promise<Result<Array<Choice>>> {
      return await this.get.json<Result<Array<Choice>>>(`/tags/search/:query`, {
        ":query": query,
      });
    }
  }
}
