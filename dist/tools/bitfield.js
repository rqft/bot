"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigBitField = exports.BitField = void 0;
class BitField {
    memory;
    static = BitField;
    constructor(bits) {
        if (bits instanceof BitField) {
            bits = bits.memory;
        }
        this.memory = bits;
    }
    get(location) {
        return (this.memory & this.mask(location)) * 1;
    }
    enable(location) {
        this.memory |= this.mask(location);
        return this;
    }
    disable(location) {
        this.memory &= ~this.mask(location);
        return this;
    }
    set(location, value) {
        if (value) {
            this.enable(location);
        }
        else {
            this.disable(location);
        }
        return this;
    }
    clear() {
        this.memory = 0;
        return this;
    }
    toggle(location) {
        this.memory ^= this.mask(location);
        return this;
    }
    has(location) {
        return !!(this.memory & this.mask(location));
    }
    mask(location) {
        return 1 << location;
    }
    toArray(to) {
        return to.filter((_bit, index) => this.get(this.mask(index)) === this.mask(index));
    }
    toString() {
        return this.memory.toString(2);
    }
    valueOf() {
        return this.memory;
    }
    clone() {
        return new this.static(this);
    }
}
exports.BitField = BitField;
class BigBitField {
    memory;
    static = BigBitField;
    constructor(bits) {
        if (bits instanceof BigBitField) {
            bits = bits.memory;
        }
        this.memory = bits;
    }
    get(location) {
        return (this.memory & this.mask(location)) * 1n;
    }
    enable(location) {
        this.memory |= this.mask(location);
        return this;
    }
    disable(location) {
        this.memory &= ~this.mask(location);
        return this;
    }
    set(location, value) {
        if (value) {
            this.enable(location);
        }
        else {
            this.disable(location);
        }
        return this;
    }
    clear() {
        this.memory = 0n;
        return this;
    }
    toggle(location) {
        this.memory ^= this.mask(location);
        return this;
    }
    has(location) {
        return !!(this.memory & this.mask(location));
    }
    mask(location) {
        return 1n << location;
    }
    toArray(to) {
        return to.filter((_bit, index) => this.get(this.mask(BigInt(index))) === this.mask(BigInt(index)));
    }
    toString() {
        return this.memory.toString(2);
    }
    valueOf() {
        return this.memory;
    }
    clone() {
        return new this.static(this);
    }
}
exports.BigBitField = BigBitField;
