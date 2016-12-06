#! /usr/local/bin/node
// This file is meant to be executed using Node.js

const input = "abbhdwsy";

const crypto = require("crypto");
function md5(string) {
    return crypto.createHash("md5").update(string).digest("hex");
}

function *pwdChars(door, length) {
    let index = 0;
    let count = 0;

    while (count <= length) {
        let hash = md5(`${door}${index}`);
        if (hash.startsWith("00000")) {
            count++;
            if (count <= length) yield hash[5];
            else return hash[5];
        }
        index++;
    }
}

console.log([ ...pwdChars(input, 8) ].join(""));

// Basically, I felt like using a generator here. Not to mention using the spread operator
// with it... Quite nice, if you ask me.
