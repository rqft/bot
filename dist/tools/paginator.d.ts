import { Structures } from "detritus-client";
import { RequestTypes } from "detritus-client-rest";
import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Member, Message, User } from "detritus-client/lib/structures";
import { ComponentContext, Components, Embed } from "detritus-client/lib/utils";
import { Timeout } from "detritus-utils/lib/timers";
export declare type PaginatorContext = Context | InteractionContext | Message;
export declare const MAX_PAGE: number;
export declare const MIN_PAGE = 1;
export declare enum PageButtonNames {
    CUSTOM = "custom",
    NEXT = "next",
    NEXT_LARGE = "next-large",
    PREVIOUS = "previous",
    PREVIOUS_LARGE = "previous-large",
    SHUFFLE = "shuffle",
    STOP = "stop"
}
export interface PageButtonEmoji {
    animated?: boolean;
    id?: string | null;
    name: string;
}
export declare type PageButton = {
    label?: string;
    emoji?: PageButtonEmoji;
};
export declare const PageButtons: Record<PageButtonNames, PageButton>;
export declare type Page = Embed;
export declare type OnError = (error: Error, paginator: Paginator) => unknown;
export declare type OnExpire = (paginator: Paginator) => unknown;
export declare type OnPage = (page: number) => Page | Promise<Page>;
export declare type OnPageNumber = (content: string) => Promise<number> | number;
export declare type PartialButtons = Partial<Record<PageButtonNames, PageButton>>;
export interface PaginatorOptions {
    buttons?: PartialButtons;
    expire?: number;
    isEphemeral?: boolean;
    message?: Message;
    page?: number;
    pageLimit?: number;
    pageSkipAmount?: number;
    pages?: Array<Page>;
    targets?: Array<Member | User | string>;
    onError?: OnError;
    onExpire?: OnExpire;
    onPage?: OnPage;
    onPageNumber?: OnPageNumber;
}
export interface Custom {
    expire: number;
    isActive: boolean;
    message?: Message | null;
    timeout?: Timeout;
    userId?: string | null;
}
export declare class Paginator {
    readonly context: Context | InteractionContext | Structures.Message;
    readonly custom: {
        expire: number;
        isActive: boolean;
        message?: null | Structures.Message;
        timeout: Timeout;
        userId?: null | string;
    };
    _isEphemeral?: boolean;
    _message: null | Structures.Message;
    buttons: Record<PageButtonNames, PageButton>;
    expires: number;
    page: number;
    pageLimit: number;
    pageSkipAmount: number;
    pages?: Array<Page>;
    ratelimit: number;
    ratelimitTimeout: Timeout;
    stopped: boolean;
    targets: Array<string>;
    onError?: OnError;
    onExpire?: OnExpire;
    onPage?: OnPage;
    onPageNumber?: OnPageNumber;
    constructor(context: Context | InteractionContext | Structures.Message, options: PaginatorOptions);
    get components(): Components;
    get channelId(): string;
    get id(): string;
    get isEphemeral(): boolean;
    set isEphemeral(isEphemeral: boolean);
    get isLarge(): boolean;
    get message(): null | Structures.Message;
    set message(value: null | Structures.Message);
    get messageId(): string;
    get shouldHaveComponents(): boolean;
    get randomPage(): number;
    addPage(page: Page): Paginator;
    canInteract(userId: string): boolean;
    reset(): void;
    stop(clearButtons?: boolean, context?: ComponentContext): Promise<void>;
    clearCustomMessage(context?: ComponentContext): Promise<void>;
    getPage(pageNumber: number): Promise<[Embed, Array<RequestTypes.File> | undefined]>;
    setPage(pageNumber: number, context?: ComponentContext): Promise<void>;
    updateButtons(context?: ComponentContext): Promise<void>;
    onButtonPress(context: ComponentContext): Promise<void>;
    onMessage(message: Structures.Message): Promise<void>;
    onStop(error?: Error | null, clearButtons?: boolean, context?: ComponentContext, deleteMessage?: boolean): Promise<void>;
    start(): Promise<Structures.Message | null>;
}
