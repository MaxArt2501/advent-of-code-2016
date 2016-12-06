const lines = input.slice(0, -1).split("\n");

let message = "";
for (let i = 0; i < 8; i++) {
    const letters = {};
    lines.forEach(line => {
        letters[line[i]] = (letters[line[i]] || 0) + 1;
    });

    const sorted = Object.entries().sort((a, b) => a[1] - b[1]);
    message += sorted[0][0];
}

message;

// Aaaand all we had to do here is to reverse the sorting function.
// And the message might *still* look gibberish.
