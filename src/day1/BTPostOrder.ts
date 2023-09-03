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
    walk(currentNode.right, path);
    // post
    path.push(currentNode.value);
    return path;
};

// left, right, node
export default function post_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
