// bfs uses queue
export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
   const seen = Array.from({ length: graph.length }).fill(false);
   const prev = Array.from({ length: graph.length }).fill(-1);

   seen[source] = true;
   const q = [source];
   // find the needle
   while (q.length) {
      // get next node
      const current = q.shift()
      if (current === null || current === undefined) break;
      // found needle
      if (current === needle) {
         break;
      }

      // loop through edges and find the node
      seen[current] = true;
      const adjs = graph[current];
      for (let i = 0; i < adjs.length; i++) {
         // already seen this node, skip it
         if (seen[i] || adjs[i] === 0) continue;
         seen[i] = true
         // write a backwards path of how to get to a node
         prev[i] = current
         q.push(i)
      }
   }

   // make the path go backwards
   const path: number[] = [needle];
   if (prev[needle] === -1) return null;
   let current = prev[needle] as number
   while (current !== -1) {
      path.push(current)
      if (prev[current] === -1) break;
      current = prev[current] as number
   }
   return path.reverse()

}