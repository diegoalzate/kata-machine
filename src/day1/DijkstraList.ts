// return shortest path
// a nice pattern to use here is a minHeap
export default function DijkstraList(
    source: number,
    needle: number,
    graph: WeightedAdjacencyList,
): number[] {
    // create book keeping arrays
    // seen, prev and distances from source
    const seen = new Array(graph.length).fill(false);
    const prev = new Array(graph.length).fill(-1);
    const distances = new Array(graph.length).fill(Infinity);

    distances[source] = 0;
    // loop until it no longer has unvisited nodes
    while (hasUnivistedNodes(seen, distances)) {
        // get lowest univisted node
        const low = getLowestUnivisitedNodeIndex(seen, distances);
        if (low === null) break;
        seen[low] = true;
        const lowEdges = graph[low];
        // go through all the low edges
        for (const edge of lowEdges) {
            if (seen[edge.to]) continue;
            // calculate distance of new node
            const nextDistance = distances[low] + edge.weight;
            // if dist is less than current distance to edge
            if (nextDistance < distances[edge.to]) {
                prev[edge.to] = low;
                distances[edge.to] = nextDistance;
            }
        }
    }
    // walk back the previous array
    const out = [needle];
    let currentNode = needle;
    while (prev[currentNode] !== -1) {
        out.push(prev[currentNode]);
        currentNode = prev[currentNode];
    }
    return out.reverse();
}

function hasUnivistedNodes(seen: boolean[], dist: number[]): boolean {
    let nodes = [];
    for (let i = 0; i < seen.length; i++) {
        if (!seen[i] && dist[i] < Infinity) {
            nodes.push(i);
        }
    }

    return !!nodes.length;
}

function getLowestUnivisitedNodeIndex(
    seen: number[],
    dist: number[],
): number | null {
    let lowestDist = Infinity;
    let nodeIndex = null;
    for (let i = 0; i < seen.length; i++) {
        if (seen[i]) continue;
        if (dist[i] < lowestDist) {
            lowestDist = dist[i];
            nodeIndex = i;
        }
    }

    return nodeIndex;
}
