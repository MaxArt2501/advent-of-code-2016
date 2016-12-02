const moves = input.split(", ");

const initialState = {
    // dir could be 0-3
    dir: 0,
    pos: [ 0, 0 ]
};
const finalState = moves.reduce(makeMove, initialState);

const [ x, y ] = finalState.pos;
const finalDistance = Math.abs(x) + Math.abs(y);

function makeMove(state, move) {
    const dirChange = move[0] === "R" ? 1 : -1;
    const dir = (state.dir + dirChange) & 3;

    // If dir is 0 or 2, we're moving on the x axis; if 1 or 3, y axis
    const axis = dir & 1;
    
    const dist = +move.slice(1);
    // If dir is 2 or 3, we're moving towards negative values
    const change = dist * (dir > 1 ? -1 : 1);
    const pos = [ ...state.pos ];
    pos[axis] += change;
    
    return { dir, pos };
}
