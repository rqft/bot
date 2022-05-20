export class BitField {
  public memory: number;
  public static: typeof BitField = BitField;
  constructor(bits: number | BitField) {
    if (bits instanceof BitField) {
      bits = bits.memory;
    }
    this.memory = bits;
  }
  get(location: number) {
    return (this.memory & this.mask(location)) * 1;
  }
  enable(location: number) {
    this.memory |= this.mask(location);
    return this;
  }
  disable(location: number) {
    this.memory &= ~this.mask(location);
    return this;
  }
  set(location: number, value: boolean) {
    if (value) {
      this.enable(location);
    } else {
      this.disable(location);
    }
    return this;
  }
  clear() {
    this.memory = 0;
    return this;
  }
  toggle(location: number) {
    this.memory ^= this.mask(location);
    return this;
  }
  has(location: number) {
    return !!(this.memory & this.mask(location));
  }

  mask(location: number) {
    return 1 << location;
  }
  toArray<T>(to: Array<T>) {
    return to.filter(
      (_bit, index) => this.get(this.mask(index)) === this.mask(index)
    );
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
export class BigBitField {
  public memory: bigint;
  public static: typeof BigBitField = BigBitField;
  constructor(bits: bigint | BigBitField) {
    if (bits instanceof BigBitField) {
      bits = bits.memory;
    }
    this.memory = bits;
  }
  get(location: bigint) {
    return (this.memory & this.mask(location)) * 1n;
  }
  enable(location: bigint) {
    this.memory |= this.mask(location);
    return this;
  }
  disable(location: bigint) {
    this.memory &= ~this.mask(location);
    return this;
  }
  set(location: bigint, value: boolean) {
    if (value) {
      this.enable(location);
    } else {
      this.disable(location);
    }
    return this;
  }
  clear() {
    this.memory = 0n;
    return this;
  }
  toggle(location: bigint) {
    this.memory ^= this.mask(location);
    return this;
  }
  has(location: bigint) {
    return !!(this.memory & this.mask(location));
  }

  mask(location: bigint) {
    return 1n << location;
  }
  toArray<T>(to: Array<T>) {
    return to.filter(
      (_bit, index) =>
        this.get(this.mask(BigInt(index))) === this.mask(BigInt(index))
    );
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
