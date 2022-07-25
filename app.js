const depthFirstPrint = (graph, source) => {
  const stack = [source];

  while (stack.length > 0) {
    let current = stack.pop();
    console.log(current);

    for (let neighbour of graph[current]) {
      stack.push(neighbour);
    }
  }
};

//recursive

const depthFirstPrinteRecursive = (graph, source) => {
  console.log(source);

  for (let neighbour of graph[source]) {
    depthFirstPrint(graph, neighbour);
  }
};

const breathFirstPrint = (graph, source) => {
  const queue = [source];

  while (queue.length > 0) {
    let current = queue.shift();
    console.log(current);

    for (let neighbour of graph[current]) {
      queue.push(neighbour);
    }
  }
};

const breathFirstPrintRecursive = (graph, source) => {
  console.log(source);

  for (let neighbour of graph[source]) {
    breathFirstPrint(graph, neighbour);
  }
};

const hasPathrecursive = (graph, src, dst) => {
  if (src === dst) return true;

  for (let neighbour of graph[src]) {
    if (hasPath(graph, neighbour, dst) === true) return true;
  }

  return false;
};

const hasPath = (graph, src, dst) => {
  const stack = [src];

  while (stack.length > 0) {
    let current = stack.pop();

    if (current === dst) return true;

    for (let neighbour of graph[current]) {
      stack.push(neighbour);
    }
  }

  return false;
};

const graph = {
  a: ["c", "b"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: [],
};

// depthFirstPrint(graph, "a");
// depthFirstPrinteRecursive(graph, "a");

// breathFirstPrint(graph, "a");
// console.log(hasPath(graph, "a", "f"));

//undirected graph
const edges = [
  ["i", "j"],
  ["k", "i"],
  ["m", "k"],
  ["k", "l"],
  ["o", "n"],
];

const createAdjlist = (edges) => {
  const graph = {};

  for (let node of edges) {
    const [a, b] = node;
    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];

    graph[a].push(b);
    graph[b].push(a);
  }

  return graph;
};

const hasPath2 = (graph, src, dst, visited) => {
  if (src === dst) return true;
  if (visited.has(src)) return false;

  visited.add(src);

  for (let node of graph[src]) {
    if (hasPath2(graph, node, dst, visited) === true) return true;
  }

  return false;
};

const undirectedPath = (edges, nodeA, nodeB) => {
  const graph = createAdjlist(edges);

  console.log(graph);

  return hasPath2(graph, nodeA, nodeB, new Set());

  //   const queue = [nodeA];

  // //   while (queue.length > 0) {
  // //     const current = queue.shift();

  // //     if (current === nodeB) return true;

  // //     for (let neighbour of graph[current]) {
  // //       queue.push(neighbour);
  // //     }
  // //   }
};

// connect component problem
// const explore = (graph, current, visited, componentCount) => {
//   if (visited.has(String(current))) return false;

//   visited.add(String(current));
//   componentCount++;

//   console.log(visited);

//   for (let neighbour of graph[current]) {
//     explore(graph, neighbour, visited);
//   }

//   return [true, componentCount];
// };

const connectedComponentCount = (graph) => {
  const visited = new Set();
  let count = 0;

  for (let node in graph) {
    if (explore(graph, node, visited) === true) count++;
  }

  return count;
};

const graphValues = {
  0: [8, 1, 5],
  1: [0],
  5: [0, 8],
  8: [0, 5],
  2: [3, 4],
  3: [2, 4],
  4: [3, 2],
};

// largest component
const explore = (graph, current, visited) => {
  if (visited.has(String(current))) return 0;

  visited.add(String(current));
  let size = 0;
  size++;

  for (let neighbour of graph[current]) {
    size += explore(graph, neighbour, visited);
  }

  return size;
};

// largest component
const largestComponentCount = (graph) => {
  const visited = new Set();
  let count = 0;

  for (let node in graph) {
    const size = explore(graph, node, visited);

    count = Math.max(count, size);
  }

  return count;
};

//shortest path( breath first is the easiest way to calculate)
const shortestPath = (graph, src, target) => {
  let count = 0;
  const queue = [[src, count]];
  const visited = new Set();

  while (queue.length > 0) {
    let [current, distance] = queue.shift();

    if (src === target) return distance;

    for (let neighbour of graph[current]) {
      if (!visited.has(String(neighbour))) {
        visited.add(String(neighbour));
        queue.push([neighbour, count++]);
      }
    }
  }

  return -1;
};

const grid = [
  ["W", "L", "W", "W", "W"],
  ["L", "L", "W", "W", "W"],
  ["W", "W", "W", "L", "W"],
  ["W", "W", "L", "L", "W"],
  ["L", "W", "W", "L", "L"],
  ["L", "L", "W", "W", "W"],
];

//2d grid
//Return number of island in the grid
const exploreLand = (graph, r, c, visited) => {
  let rowInBounds = (0 < r || 0 === r) && r < graph.length;
  let colInBounds = (0 < c || 0 === c) && c < graph[0].length;
  if (!rowInBounds || !colInBounds) return false;

  if (graph[r][c] === "W") return false;

  let pos = r + "," + c;
  if (visited.has(String(pos))) return false;
  visited.add(String(pos));

  console.log(visited);

  exploreLand(graph, r - 1, c, visited);
  exploreLand(graph, r + 1, c, visited);
  exploreLand(graph, r, c - 1, visited);
  exploreLand(graph, r, c + 1, visited);

  return true;
};

//return the minimum island in a grid
const exploreMinLand = (graph, r, c, visited) => {
  let rowInBounds = (0 < r || 0 === r) && r < graph.length;
  let colInBounds = (0 < c || 0 === c) && c < graph[0].length;
  if (!rowInBounds || !colInBounds) return 0;

  if (graph[r][c] === "W") return 0;

  let pos = r + "," + c;
  if (visited.has(String(pos))) return 0;
  visited.add(String(pos));

  let size = 1;

  size += exploreMinLand(graph, r - 1, c, visited);
  size += exploreMinLand(graph, r + 1, c, visited);
  size += exploreMinLand(graph, r, c - 1, visited);
  size += exploreMinLand(graph, r, c + 1, visited);

  return size;
};

const numberOfIsland = (grid) => {
  const visited = new Set();
  let count = Infinity;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      let value = exploreMinLand(grid, r, c, visited);
      if (value > 0) count = Math.min(value, count);
    }
  }

  return count;
};

console.log(numberOfIsland(grid));
