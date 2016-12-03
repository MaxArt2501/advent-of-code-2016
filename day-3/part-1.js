const triplets = input.trim().split("\n")
        .map(line => line.trim().split(/ +/).map(Number));

triplets.filter(triplet => {
    const sorted = [ ...triplet ].sort((a, b) => a - b);

    return sorted[0] + sorted[1] > sorted[2];
}).length;

// This one's been fairly easy. I sorted the lengths of the sides just because we can return a simpler
// condition, but it could be done in other ways.
