/// <reference types="node" />
export declare function is_eval(script: string, inject?: object): Promise<(string | boolean | null)[] | (boolean | Buffer | import("node-fetch").Headers)[]>;
