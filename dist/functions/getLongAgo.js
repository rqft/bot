"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleShortGetLongAgo = exports.shortLongAgo = exports.simpleGetLongAgo = exports.getLongAgo = void 0;
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
function getLongAgo(ts, limiter, diffSinceNow = true, lowestUnit = undefined) {
    if (diffSinceNow)
        ts = new Date(new Date().getTime() - ts).getTime();
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
            }
            else {
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
        if (lowestUnit === key)
            hitLowest = true;
        let cc = value > 1 ? `${key}s` : key;
        cc = `${cc.substr(0, 1).toUpperCase()}${cc.substr(1).toLowerCase()}`;
        txtret.push(`${value} ${cc}`);
        runsc += 1;
    }
    return txtret.join(", ");
}
exports.getLongAgo = getLongAgo;
function simpleGetLongAgo(ts) {
    return getLongAgo(ts, 2, undefined, undefined);
}
exports.simpleGetLongAgo = simpleGetLongAgo;
const shortTimeMap = new Map([
    ["dc", 1000 * 60 * 60 * 24 * 365 * 10],
    ["y", 1000 * 60 * 60 * 24 * 365],
    ["mo", 1000 * 60 * 60 * 24 * 31],
    ["w", 1000 * 60 * 60 * 24 * 7],
    ["d", 1000 * 60 * 60 * 24],
    ["h", 1000 * 60 * 60],
    ["m", 1000 * 60],
    ["s", 1000],
    ["ms", 1],
]);
function shortLongAgo(ts, limiter, diffSinceNow = true, lowestUnit = undefined) {
    if (diffSinceNow)
        ts = new Date(new Date().getTime() - ts).getTime();
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
            }
            else {
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
        if (lowestUnit === key)
            hitLowest = true;
        let cc = value > 1 ? `${key}s` : key;
        txtret.push(`${value}${cc}`);
        runsc += 1;
    }
    return txtret.join(", ");
}
exports.shortLongAgo = shortLongAgo;
function simpleShortGetLongAgo(ts) {
    return shortLongAgo(ts, 2, undefined, undefined);
}
exports.simpleShortGetLongAgo = simpleShortGetLongAgo;
