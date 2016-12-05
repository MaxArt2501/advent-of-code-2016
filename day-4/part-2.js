const rooms = input.slice(0, -1).split("\n");

function splitData(fullName) {
    const m = fullName.match(/^([a-z\-]+?)-(\d+)\[([a-z]{5})\]$/);

    return m.slice(1);
}

const space = " ".charCodeAt(0);   // Yeah, I know it's 32
const letterA = "a".charCodeAt(0); // Yeah, yeah, it's 97
// This function basically applies the Ceasar Cypher to the encrypted name
function decryptName(data) {
    const encName = data[0];
    const shift = data[1] % 26;

    const decrypted = [ ...encName ].map(letter => {
        if (letter === "-") return space;

        return (letter.charCodeAt(0) - letterA + shift) % 26 + letterA;
    });

    return String.fromCharCode(...decrypted);
}

const secretRoom = rooms.map(splitData)
        .find(data => decryptName(data) === "northpole object storage");

secretRoom[1];

// I've kept things slimmer here, after all all we need is an id.
// In my input there was only one room whose name was "northpole object storage", and it was a valid
// one, but I can't guarantee there can't be an invalid room with the same name. In that case, you
// would need to filter the rooms by their validity, just like we did in the first part.
