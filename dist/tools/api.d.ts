import { Pariah } from "pariah";
export declare module YoutubeSearch {
    const Url: URL;
    interface Result {
        kind: string;
        etag: string;
        nextPageToken: string;
        regionCode: string;
        pageInfo: PageInfo;
        items: Array<Item>;
    }
    interface PageInfo {
        totalResults: number;
        resultsPerPage: number;
    }
    interface Item {
        kind: string;
        etag: string;
        id: Id;
        snippet: Snippet;
    }
    interface Id {
        kind: string;
        videoId: string;
    }
    interface Snippet {
        publishedAt: string;
        channelId: string;
        title: string;
        description: string;
        thumbnails: Thumbnails;
        channelTitle: string;
        liveBroadcastContent: string;
        publishTime: string;
    }
    interface Thumbnails {
        default: Thumbnail;
        medium: Thumbnail;
        high: Thumbnail;
    }
    interface Thumbnail {
        url: string;
        width: number;
        height: number;
    }
    class API extends Pariah {
        readonly token: string;
        constructor(token: string);
        search(query: string, maxResults?: number): Promise<import("pariah").Data<Result>>;
    }
}
