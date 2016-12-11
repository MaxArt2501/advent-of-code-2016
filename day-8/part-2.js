// Just do part 1 again a read the content of the dot matrix. For example:

console.log(matrix.map(line => line.replace(/0/g, " ")).join("\n"));

// Technically we *could* write something that reads the letters from the final matrix, but each of us
// can only know a limited set of displayed characters, and we wouldn't know how the other letters are
// represented.
