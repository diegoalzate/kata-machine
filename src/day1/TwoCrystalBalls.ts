export default function two_crystal_balls(breaks: boolean[]): number {
    const jumpDistance = Math.floor(Math.sqrt(breaks.length));
    let lo = 0;
    let hi = 0 + jumpDistance;

    for (let i = 0; i < breaks.length; i += jumpDistance) {
        if (breaks[i]) {
            hi = i;
            lo = i - jumpDistance;
            break;
        }
    }

    for (let index = lo; index <= hi && index < breaks.length; index++) {
        if (breaks[index]) {
            return index;
        }
    }

    return -1;
}
