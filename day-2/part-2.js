const instructions = input.trim().split("");

const pos = [ 0, 2 ];
const posMap = [
    "  1  ",
    " 234 ",
    "56789",
    " ABC ",
    "  D  "
];
const allowedMap = [
    [ "", "", "D", "", "" ],
    [ "", "DR", "UDLR", "DL", "" ],
    [ "R", "UDLR", "UDLR", "UDLR", "L" ],
    [ "", "UR", "UDLR", "UL", "" ],
    [ "", "", "U", "", "" ]
];

instructions.map(steps => {
    steps.split("").forEach(step => {
        const allowed = allowedMap[pos[1]][pos[0]];
        if (!allowed.includes(step)) return;

        switch (step) {
          case "U": pos[1]--; break;
          case "D": pos[1]++; break;
          case "L": pos[0]--; break;
          case "R": pos[0]++; break;
        }
    });

    return posMap[pos[1]][pos[0]];
}).join("");

// Things are getting a little complicated here. Instead of checking the boundaries of the keypad, we're
// checking against a list of allowed moves for each position. And instead of a function to convert the
// position back to its number, we're using an array map. Yes, it's all ugly, but correct and fast.
