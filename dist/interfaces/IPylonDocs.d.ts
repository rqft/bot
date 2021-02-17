export declare enum Kind {
    "Class" = "<:class:803715741886840853>",
    "Enumeration" = "<:enumeration:803715742109138975>",
    "Interface" = "<:interface:803715741932060673>",
    "Type alias" = "<:typealias:803716217919242273>",
    "Function" = "<:function:803715741887103067>",
    "Method" = "<:method:803715742184112148>",
    "Variable" = "<:module:803716578293973052>",
    "Property" = "<:property:803715742037966909>",
    "Enumeration member" = "<:enumerationmember:803715741999562753>",
    "Event" = "<:function:803715741887103067>"
}
export interface SemiResult {
    value: string;
    matchLevel: string;
}
export interface FullResult extends SemiResult {
    fullyHighlighted?: false;
    matchedWords: Array<string>;
}
export interface HighlightResult {
    path: FullResult;
    name: FullResult;
    comment: FullResult;
}
export interface SnippetResult {
    comment: SemiResult;
}
export interface Hit {
    path: string;
    name: string;
    title: string;
    kind: Kind;
    url: string;
    signature?: string;
    comment: string;
    namespace: string;
    objectID: string;
    _distinctSeqID: number;
    _snippetResult: SnippetResult;
    _highlightResult: HighlightResult;
}
export interface Results {
    hits: Array<Hit>;
    page: number;
    nbhits: number;
    nbPages: number;
    hitsPerPage: number;
    exhaustiveNbHits: number;
    query: string;
    queryAfterRemoval: string;
    params: string;
    index: string;
    processingTimeMS: number;
}
export interface AlgoliaResult {
    results: Array<Results>;
}
