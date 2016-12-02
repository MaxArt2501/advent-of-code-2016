const moves = input.split(", ");

const visited = [];
let dir = 0;
let pos = [ 0, 0 ];

// It's a label! In JavaScript!
fast: for (const move of moves) {
    const dirChange = move[0] === "R" ? 1 : -1;
    dir = (dir + dirChange) & 3;

    // If dir is 0 or 2, we're moving on the x axis; if 1 or 3, y axis
    const axis = dir & 1;
    
    const dist = +move.slice(1);
    // If dir is 2 or 3, we're moving towards negative values
    const step = dir > 1 ? -1 : 1;
    for (let i = 0, place; i < dist; i++) {
        pos[axis] += step;
        place = `${pos}`;
        if (visited.includes(place))
            break fast; // Yummy!
        
        visited.push(place);
    }
}

const finalDistance = Math.abs(pos[0]) + Math.abs(pos[1]);

/*
 * This is a slight edit of part 1. Basically, we have to walk every single step, keep track of the visited
 * positions, and stop when we reach a visited place.
 * Used for..of instead of an FP approach because breaking loops is easier... and often forgotten!
 */
