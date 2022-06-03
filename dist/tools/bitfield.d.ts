export declare class BitField {
    memory: number;
    static: typeof BitField;
    constructor(bits: number | BitField);
    get(location: number): number;
    enable(location: number): this;
    disable(location: number): this;
    set(location: number, value: boolean): this;
    clear(): this;
    toggle(location: number): this;
    has(location: number): boolean;
    mask(location: number): number;
    toArray<T>(to: Array<T>): T[];
    toString(): string;
    valueOf(): number;
    clone(): BitField;
}
export declare class BigBitField {
    memory: bigint;
    static: typeof BigBitField;
    constructor(bits: bigint | BigBitField);
    get(location: bigint): bigint;
    enable(location: bigint): this;
    disable(location: bigint): this;
    set(location: bigint, value: boolean): this;
    clear(): this;
    toggle(location: bigint): this;
    has(location: bigint): boolean;
    mask(location: bigint): bigint;
    toArray<T>(to: Array<T>): T[];
    toString(): string;
    valueOf(): bigint;
    clone(): BigBitField;
}
