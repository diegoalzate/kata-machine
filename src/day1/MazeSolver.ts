// css directions up right down left
const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

const walk = (
    maze: string[],
    wall: string,
    current: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean => {
    // base conditions
    if (
        current.x < 0 ||
        current.x > maze[0].length ||
        current.y < 0 ||
        current.y > maze.length
    ) {
        return false;
    }

    if (maze[current.y][current.x] === wall) {
        return false;
    }

    if (seen[current.y][current.x]) {
        return false;
    }

    if (current.x === end.x && current.y === end.y) {
        // add last point
        path.push(current);
        return true;
    }

    // recursive case
    // pre
    seen[current.y][current.x] = true;
    path.push(current);

    // recurse

    // try out all directions
    for (let i = 0; i < directions.length; i++) {
        const [y, x] = directions[i];
        if (
            walk(
                maze,
                wall,
                { x: current.x + x, y: current.y + y },
                end,
                seen,
                path,
            )
        ) {
            // end the walk, we found the end
            return true;
        }
    }

    // post
    // no direction from my current point led to the end
    path.pop();
    return false;
};

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const path: Point[] = [];
    const seen: boolean[][] = [[]];

    // init seen to false
    for (let i = 0; i < maze.length; i++) {
        for (let j = 0; j < maze[i].length; j++) {
            seen[i] = [];
            seen[i].push(false);
        }
    }
    walk(maze, wall, start, end, seen, path);

    return path;
}
