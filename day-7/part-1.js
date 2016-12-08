// Matches an ABBA
const outsideBracketsRE = /(?!\1)(\w)\2\1/;
// Matches an ABBA inside square brackets
const insideBracketsRE = /\[\w*?(\w)(?!\1)(\w)\2\1/;
// Matches square brackets and what's inside them
const bracketsRE = /\[\w+\]/g;

const lines = input.slice(0, -1).split("\n");
const valid = lines
        // First we filter out those IPs that have an ABBA inside the brackets
        .filter(ip => !insideBracketsRE.test(ip))
        // Then we keep only those IPs that have an ABBA outside the brackets
        .filter(ip => outsideBracketsRE.test(ip.replace(bracketsRE, " ")));

valid.length;
