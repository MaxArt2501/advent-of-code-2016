// Well time to change... everything.

function decompressedSize(string) {
    let total = 0;
    let start = 0;
    let block;
    while (block = getNextMarker(string, start)) {
        const [ index, chunk, amount, newIndex ] = block;
        total += (index - start) + amount * decompressedSize(chunk);
        start = newIndex;
    }

    // Let's add the remainder of the string
    return total + string.length - start;
}

// This function returns info about a compressed block
function getNextMarker(string, start) {
    // We could've used a regex here, but it actually complicates things because of starting
    // indexes and whatever. A generator probably could have solved this.
    const index = string.indexOf("(", start);
    if (index < 0) return null;

    // This is the substring inside parentheses.
    const data = string.slice(index + 1, string.indexOf(")", start));
    const [ letters, amount ] = data.split("x");

    // Searching must restart from this index
    const newIndex = index + data.length + 2;
    // And this is the chunk that has to be repeated
    const chunk = string.substr(newIndex, +letters);

    return [ index, chunk, +amount, newIndex + +letters ];
}

decompressedSize(input);
