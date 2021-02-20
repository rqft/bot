/// <reference types="node" />
export declare function api(url: string, type?: "json" | "text" | "buffer" | "arrayBuffer"): Promise<ArrayBuffer | Buffer | any | string>;
