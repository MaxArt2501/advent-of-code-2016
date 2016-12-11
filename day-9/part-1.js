const parts = [];
// A regex to catch the markers
const markerRE = /\((\d+)x(\d+)\)/g;

let match;
let newIndex = 0;
while (match = markerRE.exec(input)) {
    // We add the head of the string that comes before the marker
    parts.push(input.slice(newIndex, match.index));

    const [ , letters, amount ] = match;
    // The index we'll use to start searching again from
    newIndex = markerRE.lastIndex + +letters;

    // The block that needs to be repeated
    const block = input.slice(markerRE.lastIndex, newIndex);
    parts.push(block.repeat(+amount));

    // We set the next starting index for our search
    markerRE.lastIndex = newIndex;
}
// We finally add the remainder of the input string
parts.push(input.slice(newIndex));

parts.join("").length;
