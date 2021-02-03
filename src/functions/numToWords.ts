export function arr(x: any) {
  return Array.from(x);
}
export function num(x: any) {
  return Number(x) || 0;
}
export function str(x: any) {
  return String(x);
}
export function isEmpty(xs: any) {
  return xs.length === 0;
}
export function take(n: any) {
  return (xs: any) => xs.slice(0, n);
}
export function drop(n: any) {
  return (xs: any) => xs.slice(n);
}
export function reverse(xs: any) {
  return xs.slice(0).reverse();
}
export function comp(f: any) {
  return function (g: any) {
    return function (x: any) {
      return f(g(x));
    };
  };
}
export function not(x: any) {
  return !x;
}
export function chunk(n: any) {
  return (xs: any): any =>
    isEmpty(xs) ? [] : [take(n)(xs), ...chunk(n)(drop(n)(xs))];
}

export function numToWords(n: string | number): any {
  let a = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  let b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  let g = [
    "",
    "thousand",
    "million",
    "billion",
    "trillion",
    "quadrillion",
    "quintillion",
    "sextillion",
    "septillion",
    "octillion",
    "nonillion",
    "decillion",
    "undecillion",
    "duodecillion",
    "tredecillion",
    "quatttuordecillion",
    "quindecillion",
    "sexdecillion",
    "septendecillion",
    "octodecillion",
    "novemdecillion",
    "vigintillion",
    "unvigintillion",
    "duovigintillion",
    "tresvigintillion",
    "quattuorvigintillion",
    "quinvigintillion",
    "sesvigintillion",
    "septemvigintillion",
    "octovigintillion",
    "novemvigintillion",
    "trigintillion",
    "untrigintillion",
    "duotrigintillion",
    "trestrigintillion",
    "quattuortrigintillion",
    "quintrigintillion",
    "sestrigintillion",
    "septentrigintillion",
    "octotrigintillion",
    "noventrigintillion",
    "quadragintillion",
    "quinquagintillion",
    "sexagintillion",
    "septuagintillion",
    "octogintillion",
    "nonagintillion",
    "centillion",
    "uncentillion",
    "decicentillion",
    "undecicentillion",
    "viginticentillion",
    "unviginticentillion",
    "trigintacentillion",
    "quadragintacentillion",
    "quinquagintacentillion",
    "sexagintacentillion",
    "septuagintacentillion",
    "octogintacentillion",
    "nonagintacentillion",
    "ducentillion",
    "trecentillion",
    "quadringentillion",
    "quingentillion",
    "sescentillion",
    "septingentillion",
    "octingentillion",
    "nongentillion",
    "millinillion",
  ];
  function makeGroup([ones, tens, huns]: any[]) {
    return [
      num(huns) === 0 ? "" : a[huns] + " hundred ",
      num(ones) === 0 ? b[tens] : (b[tens] && b[tens] + "-") || "",
      a[tens + ones] || a[ones],
    ].join("");
  }
  function thousand(group: any, i: any) {
    return group === "" ? group : `${group} ${g[i]}`;
  }
  if (typeof n === "number") return numToWords(str(n));
  else if (n === "0") return "zero";
  else
    return comp(chunk(3))(reverse)(arr(n)) // what the fuck?
      .map(makeGroup)
      .map(thousand)
      .filter(comp(not)(isEmpty))
      .reverse()
      .join(", ");
}
