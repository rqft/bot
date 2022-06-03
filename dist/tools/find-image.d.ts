import { Collections, Structures } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
export declare module FindImage {
    const TRUSTED_URLS: string[];
    function findImageUrlInAttachment(attachment: Structures.Attachment, as?: ImageFormats): null | string;
    function findImageUrlInEmbed(embed: Structures.MessageEmbed, ignoreGIFV?: boolean, as?: ImageFormats): null | string;
    function findImageUrlInMessage(message: Structures.Message, url?: null | string, as?: ImageFormats): null | string;
    function findImageUrlInMessages(messages: Collections.BaseCollection<string, Structures.Message> | Array<Structures.Message>, as?: ImageFormats): null | string;
    function findImageUrlsInMessage(message: Structures.Message, as?: ImageFormats): Array<string>;
    function findImageUrlsInMessages(messages: Collections.BaseCollection<string, Structures.Message> | Array<Structures.Message>, as?: ImageFormats): Array<string>;
    interface FindMediaUrlOptions {
        audio?: boolean;
        image?: boolean;
        video?: boolean;
    }
    function findMediaUrlInAttachment(attachment: Structures.Attachment, options?: FindMediaUrlOptions): null | string;
    function findMediaUrlInEmbed(embed: Structures.MessageEmbed, ignoreGIFV?: boolean, options?: FindMediaUrlOptions): null | string;
    function findMediaUrlInMessage(message: Structures.Message, url?: null | string, options?: FindMediaUrlOptions): null | string;
    function findMediaUrlInMessages(messages: Collections.BaseCollection<string, Structures.Message> | Array<Structures.Message>, options?: FindMediaUrlOptions): null | string;
    function findMediaUrlsInMessage(message: Structures.Message, options?: FindMediaUrlOptions): Array<string>;
    function findMediaUrlsInMessages(messages: Collections.BaseCollection<string, Structures.Message> | Array<Structures.Message>, options?: FindMediaUrlOptions): Array<string>;
}
