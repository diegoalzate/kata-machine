export default function linear_search(
    haystack: number[],
    needle: number,
): boolean {
    for (const x of haystack) {
        if (x === needle) {
            return true;
        }
    }

    return false;
}
