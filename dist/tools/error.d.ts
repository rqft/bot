export declare enum ErrorLevels {
    ERROR = "error",
    WARNING = "warn",
    INFO = "info",
    DEBUG = "debug"
}
export declare const ErrorEmojis: Record<ErrorLevels, string>;
export interface ErrorOptions<T> {
    level?: ErrorLevels;
    status?: number;
    statusText?: string;
    metadata?: T;
}
export declare class Err<T = string, M = unknown> {
    options: ErrorOptions<M>;
    level: ErrorLevels;
    status: number;
    metadata: M | undefined;
    message: T;
    constructor(message: T, options?: ErrorOptions<M>);
    toString(): string;
    toThrown(): string;
    static from(payload: Error | Err): Err;
}
