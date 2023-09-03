const walk = (
    currentNode: BinaryNode<number> | null,
    path: number[],
): number[] => {
    // no node to visit
    if (!currentNode) {
        return path;
    }

    // recurse
    walk(currentNode.left, path);
    path.push(currentNode.value);
    walk(currentNode.right, path);
    // post
    return path;
};

// left, visit node, right
export default function in_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
