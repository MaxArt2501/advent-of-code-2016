const instructions = input.slice(0, -1).split("\n");

// Let's prepare the dot matrix as an array of strings
const matrix = Array(6).fill("0".repeat(50));

// A single regex to catch all the instructions!
const instrRE = /^(rect|rotate) (?:(row|column) [xy]=)?(\d+)(?:x| by )(\d+)$/

const actions = {
    rect(columns, rows) {
        const line = "1".repeat(columns);
        for (let i = 0; i < rows; i++)
            matrix[i] = line + matrix[i].slice(columns);
    },
    rotaterow(row, amount) {
        matrix[row] = matrix[row].slice(-amount) + matrix[row].slice(0, -amount);
    },
    rotatecolumn(column, amount) {
        let newcol = matrix.map(line => line[column]);
        newcol = [ ...newcol.slice(-amount), ...newcol.slice(0, -amount) ];
        matrix.forEach((line, i) => {
            matrix[i] = line.slice(0, column) + newcol[i] + line.slice(column + 1);
        });
    }
};

for (let line of instructions) {
    const [ , name, type, val1, val2 ] = line.match(instrRE);
    const action = name + (type || "");
    actions[action](+val1, +val2);
}

function lineSum(line) {
    return [ ...line ].reduce((sum, ch) => sum + +ch, 0);
}

matrix.reduce((sum, line) => sum + lineSum(line), 0);
