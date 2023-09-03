const walk = (
    currentNode: BinaryNode<number> | null,
    path: number[],
): number[] => {
    // no node to visit
    if (!currentNode) {
        return path;
    }

    // pre
    path.push(currentNode.value);
    // recurse
    walk(currentNode.left, path);
    walk(currentNode.right, path);
    // post
    return path;
};

// visit node then left and right
export default function pre_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
