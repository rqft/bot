export interface IMyMemoryResponse {
    responseData: {
        translatedText: string;
        match: number;
    };
    quotaFinished: boolean;
    mtLangSupported: null | string;
    responseDetails: string;
    responseStatus: number;
    responderId: string;
    exception_code: null | any;
    matches: IMyMemoryMatch[];
}
export interface IMyMemoryMatch {
    id: string;
    segment: string;
    translation: string;
    source: string;
    target: string;
    quality: string;
    reference: null | any;
    "usage-count": number;
    subject: string;
    "created-by": string;
    "last-updated-by": string;
    "create-date": string;
    "last-update-date": string;
    match: number;
}
