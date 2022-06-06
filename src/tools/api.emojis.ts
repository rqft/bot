import { Pariah } from "pariah";
import { Data } from "pariah/dist/data";

export module EmojiData {
  export const Uri = new URL("https://emoji-api.com/");

  export interface Emoji {
    slug: string;
    character: string;
    unicodeName: string;
    codePoint: string;
    group: string;
    subGroup: string;
  }

  export interface Category {
    slug: string;
    subCategories: Array<string>;
  }

  export class API extends Pariah {
    public token: string;
    constructor(token: string) {
      super(Uri);
      this.token = token;
    }

    public async listAll(): Promise<Data<Array<Emoji>>> {
      return await this.get.json<Array<Emoji>>("/emojis", {
        access_key: this.token,
      });
    }

    public async search(search: string): Promise<Data<Array<Emoji>>> {
      return await this.get.json<Array<Emoji>>("/emojis", {
        access_key: this.token,
        search,
      });
    }

    public async single(slug: string): Promise<Data<[Emoji]>> {
      return await this.get.json<[Emoji]>("/emojis/:slug", {
        access_key: this.token,
        ":slug": slug,
      });
    }

    public async categories(): Promise<Data<Array<Category>>> {
      return await this.get.json<Array<Category>>("/categories", {
        access_key: this.token,
      });
    }

    public async category(slug: string): Promise<Data<Array<Emoji>>> {
      return await this.get.json<Array<Emoji>>("/categories/:slug", {
        access_key: this.token,
        ":slug": slug,
      });
    }

    public async searchBy<K extends keyof Emoji>(
      key: K,
      value: Emoji[K]
    ): Promise<Emoji | undefined> {
      const payload = await this.listAll();
      return payload.payload.find((emoji: Emoji) => emoji[key] === value);
    }
  }
}
