#! /usr/local/bin/node
// This file is meant to be executed using Node.js

const input = "abbhdwsy";

const crypto = require("crypto");
function md5(string) {
    return crypto.createHash("md5").update(string).digest("hex");
}

const chars = Array(8);
for (let index = 0, count = 0; count < chars.length; index++) {
    let hash = md5(`${input}${index}`);
    if (hash.startsWith("00000") && hash[5] < 8 && !chars[hash[5]]) {
        count++;
        chars[hash[5]] = hash[6];
    }
}

console.log(chars.join(""));

// For the second part, I tried a more classic approach, which should look more familiar to
// classic OO language developers. Still a pretty plain problem.
