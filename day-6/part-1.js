const lines = input.slice(0, -1).split("\n");

let message = "";
for (let i = 0; i < 8; i++) {
    const letters = {};
    lines.forEach(line => {
        letters[line[i]] = (letters[line[i]] || 0) + 1;
    });

    const sorted = Object.entries().sort((a, b) => b[1] - a[1]);
    message += sorted[0][0];
}

message;

// Well I guess not every puzzle is top notch... This was pretty plain.
// Don't worry if the message seems gibberish: it's normal.
