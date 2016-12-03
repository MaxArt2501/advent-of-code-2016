const instructions = input.trim().split("");

const pos = [ 1, 1 ];
const posToNum = (x, y) => x + y * 3 + 1;

instructions.map(steps => {
    steps.split("").forEach(step => {
        switch (step) {
            case "U": pos[1] = Math.max(0, pos[1] - 1); break;
            case "D": pos[1] = Math.min(2, pos[1] + 1); break;
            case "L": pos[0] = Math.max(0, pos[0] - 1); break;
            case "R": pos[0] = Math.min(2, pos[0] + 1); break;
        }
    });

    return posToNum(...pos);
}).join("");

// Basically we have to check that we don't go out of bounds at each step. For the rest, it's a rather easy
// problem. The trickiest part is probably to not getting confused between rows and columns.
// To convert a row/column pair into its number, I used the simple map `posToNum`.
