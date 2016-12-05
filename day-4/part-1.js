// First, we get all the lines from the input.
const rooms = input.slice(0, -1).split("\n");

// We'll use this function to split a line into its parts, i.e. the encrypted name, the sector ID
// and the checksum.
function splitData(fullName) {
    const m = fullName.match(/^([a-z\-]+?)-(\d+)\[([a-z]{5})\]$/);

    return m.slice(1);
}

// This is for generating a checksum starting from the encrypted name.
function getChecksum(encName) {
    const letters = {};
    // Let's ditch all the dashes
    [ ...encName.replace(/-/g, "") ]
    // ... and collect the number of occurrences of each letter in the map `letters`
        .forEach(letter => letters[letter] = (letters[letter] || 0) + 1);

    // Let's sort the map's entries by the amount of occurrences, then alphabetically
    const sorted = Object.entries(letters).sort((lett1, lett2) => {
        if (lett1[1] !== lett2[1])
            return lett2[1] - lett1[1];

        return lett1[0].charCodeAt(0) - lett2[0].charCodeAt(0);
    });

    return sorted.slice(0, 5).map(x => x[0]).join("");
}

// This is just a check to verify if a room is real, i.e. if its checksum is correct.
function isRealRoom(data) {
    const [ encName, , checksum ] = data;

    return getChecksum(encName) === checksum;
}

rooms.map(splitData)
    .filter(isRealRoom)
    // Get the sum of the sector IDs of all the valid rooms
    .reduce((sum, data) => sum + +data[1], 0);
