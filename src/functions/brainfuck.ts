import { Err } from "./error";

export enum Operator {
  FORWARD = ">",
  BACKWARD = "<",
  INCREMENT = "+",
  DECREMENT = "-",
  INPUT = ",",
  OUTPUT = ".",
  LOOP_START = "[",
  LOOP_END = "]",
}
export const ACTIONS_LIMIT = 5000;
export class BrainFuck {
  public readonly input: Array<Operator>;
  public tape: Array<number> = [0];
  public pointer: number = 0;
  public out: Array<number> = [];
  public stack: Array<number> = [];
  public loops: number = 0;
  public looping: boolean = false;
  public inputPointer: number = 0;
  public providedInput: Array<number> = [];
  public actions: number = 0;
  public static: typeof BrainFuck = BrainFuck;
  constructor(tape: string, inputs: string = "") {
    if (!this.static.validate(tape)) throw new Error("invalid input");
    this.input = tape.split("") as Array<Operator>;

    for (let char of inputs) {
      this.providedInput.push(char.charCodeAt(0));
    }
  }
  output(type: "ascii" | "basic" = "basic") {
    return type === "ascii"
      ? this.out.map((v) => String.fromCharCode(v))
      : this.out.map((v) => v.toString());
  }
  static validate(tape: string) {
    return tape
      .split("")
      .every((v) => Object.values(Operator).includes(v as Operator));
  }
  clamp(pos: number = this.pointer) {
    this.tape[pos]! < 0
      ? (this.tape[pos] = this.tape[pos]! & 255)
      : this.tape[pos]! > 255
      ? (this.tape[pos] = 255 - this.tape[pos]!)
      : this.tape[pos];
    return this;
  }
  run() {
    while (this.inputPointer < this.input.length) {
      const item = this.input[this.inputPointer];

      if (this.looping) {
        if (item === Operator.LOOP_START) this.loops++;
        if (item === Operator.LOOP_END)
          if (this.loops === 0) this.looping = false;
          else this.loops--;
        continue;
      }
      this.execute(item!);
      this.inputPointer++;
    }
    return this;
  }
  execute(op: Operator) {
    if (this.actions > ACTIONS_LIMIT)
      throw new Err("Too many actions", { status: 400 });
    this.actions++;
    switch (op) {
      case Operator.BACKWARD:
        this.backward();
        break;
      case Operator.DECREMENT:
        this.decrement();
        break;
      case Operator.FORWARD:
        this.forward();
        break;
      case Operator.INCREMENT:
        this.increment();
        break;
      case Operator.INPUT:
        this.prompt();
        break;
      case Operator.LOOP_END:
        this.stopLoop();
        break;
      case Operator.LOOP_START:
        this.startLoop();
        break;
      case Operator.OUTPUT:
        this.log();
        break;
    }
    this.clamp();
    return this;
  }
  read() {
    return this.tape[this.pointer] ?? 0;
  }
  write(value: number) {
    this.tape[this.pointer] = value;
  }
  forward() {
    this.pointer++;
    this.write(this.read());
    return this;
  }
  backward() {
    this.pointer--;
    this.write(this.read());
    return this;
  }
  increment() {
    this.write(this.read() + 1);
    return this;
  }
  decrement() {
    this.write(this.read() - 1);
    return this;
  }
  log() {
    this.out.push(this.read());
  }
  startLoop() {
    this.read() === 0
      ? (this.looping = true)
      : this.stack.push(this.inputPointer);
    return this;
  }
  stopLoop() {
    this.read() !== 0
      ? (this.inputPointer = this.stack[this.stack.length - 1]!)
      : this.stack.pop();
    return this;
  }
  prompt() {
    const item = this.providedInput.shift();
    this.write(item ?? this.read());
    return this;
  }
}
