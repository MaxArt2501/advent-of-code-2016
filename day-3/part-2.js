const triplets = input.trim().split("\n")
        .map(line => line.trim().split(/ +/).map(Number));

for (let i = 0; i < triplets.length; i += 3) {
    const slice = triplets.slice(i, i + 3);
    const transposed = slice.map((_, row) => [ slice[0][row], slice[1][row], slice[2][row] ]);
    triplets.splice(i, 3, ...transposed);
}

triplets.filter(triplet => {
    const [ a, b, c ] = triplet;

    return a < b + c && b < a + c && c < a + b;
}).length;

// Since the solution to part 1 worked so well, let's just reuse it. So, we actually have to transpose
// rows and columns 3 by 3, and the simplest way is still a `for` loop, as ugly as it looks in JavaScript.
// I've also changed the `filter` check, avoiding to sort the triplet and doing the necessary 3 checks
// instead. Turns out it's boring.
