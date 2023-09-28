function walk(graph: WeightedAdjacencyList, current: number, needle: number, seen: boolean[], path: number[]): boolean {
    if (seen[current]) {
        return false
    }

    seen[current] = true
    path.push(current)

    if (current === needle) {
        return true
    }

    const edges = graph[current]

    for (let i = 0; i < edges.length; i++) {
        const edge = edges[i]
        if (walk(graph, edge.to, needle, seen, path)) {
            return true
        }
    }

    path.pop()

    return false
}

export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
    const seen = Array(graph.length).fill(false);
    const path: number[] = []

    walk(graph, source, needle, seen, path)

    if (path.length === 0) {
        return null
    }

    return path
}