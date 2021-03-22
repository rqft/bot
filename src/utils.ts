module _utils {
  export namespace enums {
    interface EnumItem<E> {
      value: E;
      name: keyof E;
    }

    export function array<E>(Enum: { [s: string]: E }): EnumItem<E>[] {
      return Object.keys(Enum).map(
        (key) => ({ value: Enum[key], name: key } as EnumItem<E>)
      );
    }
    export function keys<E>(Enum: { [s: string]: E }) {
      return array(Enum).map((e) => e.name);
    }
    export function values<E>(Enum: { [s: string]: E }) {
      return array(Enum).map((e) => e.value);
    }
  }
  export namespace array {
    export const diff = (current: any[], old: any[]) => {
      return {
        added: current.filter((e) => !old.includes(e)),
        removed: old.filter((e) => !current.includes(e)),
      };
    };
    export const formatDiff = (current: any[], old: any[]) => {
      const d = diff(current, old);
      if (!d.added.length && !d.removed.length)
        return ["# Unable to resolve diff"];
      return [
        ...d.added.map((e) => `+ ${e}`),
        ...d.removed.map((e) => `- ${e}`),
      ];
    };
  }
  export namespace bitfield {
    export const array = (bitfield: number, source: any[]) => {
      return source.filter((_, i) => {
        const current = 1 << i;
        return (bitfield & current) === current;
      });
    };
  }
  export namespace number {
    export const min_safe_int = Number.MIN_SAFE_INTEGER || -9007199254740991;
    export const max_safe_int = Number.MAX_SAFE_INTEGER || 9007199254740991;
    export const factorial = (n: number) => {
      if (n === 0) return 1;
      if (n < 0) throw new Error("Cannot get factor of negative numbers");
      return [...Array(n).keys()].map((i) => i + 1).reduce((a, c) => a * c, 1);
    };
    export const digitSum = (num: number) => {
      let sum = 0;
      while (num) {
        sum += num % 10;
        num = parseInt((num / 10).toString());
      }
      return sum;
    };
    export const factors = (number: number) => {
      return Array.from(Array(number + 1).keys()).filter(
        (num) => number % num === 0
      );
    };
    export const perfectCube = (num: number) =>
      Math.round(num ** (1 / 3)) ** 3 === num;
    export const perfectSquare = (num: number) => Math.sqrt(num) ** 2 === num;
    export const random = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
  }
  export namespace string {
    // prettier-ignore
    export const reverse = (s: string) => s.split('').reverse().join('')
    export const palindrome = (s: string) => reverse(s) === s;
    export const replace = (s: string, values: [string, any][]) => {
      for (const [key, value] of values) s = s.split(key).join(value);
      return s;
    };
    export const checkAnagram = (str1: string, str2: string) => {
      if (str1.length !== str2.length) return false;
      const str1CharCount = new Map();
      for (let i = 0; i < str1.length; i++) {
        let previousCount = 0;
        if (str1CharCount.has(str1[i]))
          previousCount = str1CharCount.get(str1[i]);
        str1CharCount.set(str1[i], previousCount + 1);
      }
      for (let i = 0; i < str2.length; i++) {
        let previousCount = 0;
        if (!str1CharCount.has(str2[i])) return false;
        previousCount = str1CharCount.get(str2[i]);
        str1CharCount.set(str2[i], previousCount - 1);
      }
      for (const key in str1CharCount)
        if (str1CharCount.get(key) !== 0) return false;
      return true;
    };
    export const checkPangram = (string: string) => {
      const frequency = new Set();
      for (const letter of string.toLowerCase())
        if (letter >= "a" && letter <= "z") frequency.add(letter);
      return frequency.size === 26;
    };
    export const checkWordOccurrence = (
      str: string,
      isCaseSensitive: boolean = false
    ) => {
      const result: { [a: string]: any } = {};
      if (str.length > 0)
        for (let i = 0; i < str.length; i++) {
          if (!str[i]) break;
          const word = isCaseSensitive ? str[i] : str[i]!.toUpperCase();
          if (!word) break;
          if (/\s/.test(word)) continue;
          result[word] = !result[word] ? 1 : result[word] + 1;
        }
      return result;
    };
    export const formatPhoneNumber = (numbers: string | number) => {
      if (
        numbers.toString().length !== 10 ||
        isNaN(parseInt(numbers.toString()))
      )
        throw new TypeError("Invalid phone number.");
      const arr = "(XXX) XXX-XXXX".split("");
      Array.from(numbers.toString()).forEach(
        (n) => (arr[arr.indexOf("X")] = n)
      );
      return arr.join("");
    };
  }
  export namespace other {
    const blacklist = ["\t", "\u200F", "\u008D", "\u202E", "\u202D", "\u0674"];
    const escapeGeneral = ["*", "_", "||", "`", "@everyone", "@here", "~~"];
    const escapeCodeblock = ["```"];
    const escapeQuote = ["`"];
    export function escapeString(
      string: string,
      inQuote: boolean = false,
      inBlock: boolean = false
    ) {
      // console.log('toUnicode', '\n', string, '\n=\n', toUnicode(string));
      blacklist.forEach((vl) => {
        string = string.split(vl.toLowerCase()).join("");
      });
      let escapeList: Array<string> = [];
      if (!inQuote && !inBlock) escapeList = escapeGeneral;
      else if (inQuote && !inBlock) escapeList = escapeQuote;
      else if (!inQuote && inBlock) escapeList = escapeCodeblock;

      escapeList.forEach((char) => {
        if (char === "@everyone" || char === "@here") {
          const escape = `${char.substr(0, 1)}\u200B${char.substr(1)}`;
          string = string.split(char).join(escape);
          return;
        }

        if (char === "`" || char === "```")
          string = string.split(char).join(`'`);
        else if (char === "```") string = string.split(char).join(`'''`);
        else {
          const escape = char
            .split("")
            .map((v) => `\\${v}`)
            .join("");
          string = string.split(char).join(escape);
        }
      });
      if (string.length === 0) string = "\u200c";
      return string;
    }
  }
  export namespace snowflake {
    export const Epoch = 1420070400000;
    export function pad(v: string, n: number, c = "0") {
      return String(v).length >= n
        ? String(v)
        : (String(c).repeat(n) + v).slice(-n);
    }
    export function decomposeSnowflake(snowflake: string) {
      const binary = pad(BigInt(snowflake).toString(2), 64);
      const res = {
        timestamp: parseInt(binary.substring(0, 42), 2) + Epoch,
        workerID: parseInt(binary.substring(42, 47), 2),
        processID: parseInt(binary.substring(47, 52), 2),
        increment: parseInt(binary.substring(52, 64), 2),
        binary,
      };
      return res;
    }
  }
  export namespace timestamp {
    const timeMap = new Map([
      ["decade", 1000 * 60 * 60 * 24 * 365 * 10],
      ["year", 1000 * 60 * 60 * 24 * 365],
      ["month", 1000 * 60 * 60 * 24 * 31],
      ["week", 1000 * 60 * 60 * 24 * 7],
      ["day", 1000 * 60 * 60 * 24],
      ["hour", 1000 * 60 * 60],
      ["minute", 1000 * 60],
      ["second", 1000],
      ["millisecond", 1],
    ]);
    export function getLongAgo(
      ts: number,
      limiter: number,
      diffSinceNow: boolean = true,
      lowestUnit: string | undefined = undefined
    ) {
      if (diffSinceNow) ts = new Date(new Date().getTime() - ts).getTime();
      let runcheck = ts + 0;
      const txt = new Map();
      for (const [k, v] of timeMap) {
        if (runcheck < v || txt.entries.length >= limiter) {
          continue;
        }
        const runs = Math.ceil(runcheck / v) + 1;
        for (let i = 0; i <= runs; i += 1) {
          if (runcheck < v) {
            break;
          }
          if (txt.has(k)) {
            txt.set(k, txt.get(k) + 1);
          } else {
            txt.set(k, 1);
          }
          runcheck -= v;
        }
      }
      const txtret = [];
      let runsc = 0;
      let hitLowest = false;
      for (const [key, value] of txt) {
        if (runsc >= limiter || hitLowest === true) {
          break;
        }
        if (lowestUnit === key) hitLowest = true;
        let cc: string = value > 1 ? `${key}s` : key;
        cc = `${cc.substr(0, 1).toUpperCase()}${cc.substr(1).toLowerCase()}`;
        txtret.push(`${value} ${cc}`);
        runsc += 1;
      }
      return txtret.join(", ");
    }
    export function simpleGetLongAgo(ts: number) {
      return getLongAgo(ts, 2, undefined, undefined);
    }
    const shortTimeMap = new Map([
      ["dec", 1000 * 60 * 60 * 24 * 365 * 10],
      ["y", 1000 * 60 * 60 * 24 * 365],
      ["mo", 1000 * 60 * 60 * 24 * 31],
      ["w", 1000 * 60 * 60 * 24 * 7],
      ["d", 1000 * 60 * 60 * 24],
      ["h", 1000 * 60 * 60],
      ["m", 1000 * 60],
      ["s", 1000],
      ["ms", 1],
    ]);
    export function shortLongAgo(
      ts: number,
      limiter: number,
      diffSinceNow: boolean = true,
      lowestUnit: string | undefined = undefined
    ) {
      if (diffSinceNow) ts = new Date(new Date().getTime() - ts).getTime();
      let runcheck = ts + 0;
      const txt = new Map();
      for (const [k, v] of shortTimeMap) {
        if (runcheck < v || txt.entries.length >= limiter) {
          continue;
        }
        const runs = Math.ceil(runcheck / v) + 1;
        for (let i = 0; i <= runs; i += 1) {
          if (runcheck < v) {
            break;
          }
          if (txt.has(k)) {
            txt.set(k, txt.get(k) + 1);
          } else {
            txt.set(k, 1);
          }
          runcheck -= v;
        }
      }
      const txtret = [];
      let runsc = 0;
      let hitLowest = false;
      for (const [key, value] of txt) {
        if (runsc >= limiter || hitLowest === true) {
          break;
        }
        if (lowestUnit === key) hitLowest = true;
        let cc: string = value > 1 ? `${key}s` : key;
        txtret.push(`${value}${cc}`);
        runsc += 1;
      }
      return txtret.join("");
    }
    export function simpleShortGetLongAgo(ts: number) {
      return shortLongAgo(ts, 2, undefined, undefined);
    }
  }
}
export default _utils;
