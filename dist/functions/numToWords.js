"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numToWords = exports.chunk = exports.not = exports.comp = exports.reverse = exports.drop = exports.take = exports.isEmpty = exports.str = exports.num = exports.arr = void 0;
function arr(x) {
    return Array.from(x);
}
exports.arr = arr;
function num(x) {
    return Number(x) || 0;
}
exports.num = num;
function str(x) {
    return String(x);
}
exports.str = str;
function isEmpty(xs) {
    return xs.length === 0;
}
exports.isEmpty = isEmpty;
function take(n) {
    return (xs) => xs.slice(0, n);
}
exports.take = take;
function drop(n) {
    return (xs) => xs.slice(n);
}
exports.drop = drop;
function reverse(xs) {
    return xs.slice(0).reverse();
}
exports.reverse = reverse;
function comp(f) {
    return function (g) {
        return function (x) {
            return f(g(x));
        };
    };
}
exports.comp = comp;
function not(x) {
    return !x;
}
exports.not = not;
function chunk(n) {
    return (xs) => isEmpty(xs) ? [] : [take(n)(xs), ...chunk(n)(drop(n)(xs))];
}
exports.chunk = chunk;
function numToWords(n) {
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
    function makeGroup([ones, tens, huns]) {
        return [
            num(huns) === 0 ? "" : a[huns] + " hundred ",
            num(ones) === 0 ? b[tens] : (b[tens] && b[tens] + "-") || "",
            a[tens + ones] || a[ones],
        ].join("");
    }
    function thousand(group, i) {
        return group === "" ? group : `${group} ${g[i]}`;
    }
    if (typeof n === "number")
        return numToWords(str(n));
    else if (n === "0")
        return "zero";
    else
        return comp(chunk(3))(reverse)(arr(n))
            .map(makeGroup)
            .map(thousand)
            .filter(comp(not)(isEmpty))
            .reverse()
            .join(", ");
}
exports.numToWords = numToWords;
