import { Pariah } from "pariah";
import { Data } from "pariah/dist/data";
export declare module EmojiData {
    const Uri: URL;
    interface Emoji {
        slug: string;
        character: string;
        unicodeName: string;
        codePoint: string;
        group: string;
        subGroup: string;
    }
    interface Category {
        slug: string;
        subCategories: Array<string>;
    }
    class API extends Pariah {
        token: string;
        constructor(token: string);
        listAll(): Promise<Data<Array<Emoji>>>;
        search(search: string): Promise<Data<Array<Emoji>>>;
        single(slug: string): Promise<Data<[Emoji]>>;
        categories(): Promise<Data<Array<Category>>>;
        category(slug: string): Promise<Data<Array<Emoji>>>;
        searchBy<K extends keyof Emoji>(key: K, value: Emoji[K]): Promise<Emoji | undefined>;
    }
}
