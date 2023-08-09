export default function bs_list(haystack: number[], needle: number): boolean {
    // low inclusive and high exclusive

    let lo = 0;
    let hi = haystack.length;

    // should be true until we could not find the number
    while (lo < hi) {
        const middle = Math.floor(lo + (hi - lo) / 2);
        const value = haystack[middle];
        if (value === needle) {
            return true;
        } else if (value > needle) {
            // what we are looking for is less than the needle
            hi = middle;
        } else {
            // what we are looking for is larger than the needle
            // low is exclusive
            lo = middle + 1;
        }
    }

    return false;
}
