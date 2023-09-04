const walkAndCompare = (
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean => {
    // base
    if (a === null && b === null) return true;

    if (a === null || b === null) return false;

    if (a?.value !== b?.value) {
        return false;
    }

    // recurse
    // this node is the same lets go down
    const left = walkAndCompare(a?.left, b?.left);
    const right = walkAndCompare(a?.right, b?.right);

    return left && right;
};

export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    return walkAndCompare(a, b);
}
