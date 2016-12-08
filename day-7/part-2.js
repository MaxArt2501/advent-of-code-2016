// Our Swiss knife regex
const abaRE = /(\w)(?!\1)(\w)\1/g;

const lines = input.slice(0, -1).split("\n");
// Let's split the IPs into supernet and hypernet
const splitted = lines.map(line => {
    const partition = [ [], [] ];
    line.split(/[\[\]]/).forEach((part, index) => {
        partition[index & 1].push(part);
    });

    return {
        supernet: partition[0].join(" "),
        hypernet: partition[1].join(" ")
    };
});
const filtered = splitted.filter(split => {
    let match;
    abaRE.lastIndex = 0; // Resetting the regex
    while (match = abaRE.exec(split.supernet)) {
        // Our ABA is match[0]
        const bab = `${match[2]}${match[1]}${match[2]}`;
        if (split.hypernet.includes(bab)) return true;

        // Some ABAs might be overlapping, so we're pushing the index back
        abaRE.lastIndex -= match[0].length - 1;
    }

    return false;
});

filtered.length;
