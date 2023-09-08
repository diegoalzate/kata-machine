const search = (
    currentNode: BinaryNode<number> | null,
    value: number,
): boolean => {
    if (!currentNode) {
        return false;
    }

    if (currentNode.value === value) {
        return true;
    }

    if (currentNode.value < value) {
        return search(currentNode.right, value);
    }

    return search(currentNode.left, value);
};

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return search(head, needle);
}
