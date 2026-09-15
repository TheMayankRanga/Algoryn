export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Topic = {
  slug: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  description: string;
  tags: string[];
  whyItMatters: string;
  intuition: string;
  visualExample: string;
  algorithm: string;
  code: string;
  complexity: string;
  tips: string[];
  mistakes: string[];
  relatedPatterns: string[];
};

export type Pattern = {
  title: string;
  description: string;
  whenToUse: string;
  complexity: string;
};

export type ProblemCard = {
  id: number;
  title: string;
  difficulty: Difficulty | "Easy" | "Medium" | "Hard";
  pattern: string;
  topic: string;
  leetcodeUrl: string;
  status: "Solved" | "Attempted" | "Practice";
};

export const neetcode250Url = "https://neetcode.io/practice";

export const neetcode250Categories = [
  { name: "Arrays & Hashing", count: 25 },
  { name: "Two Pointers", count: 10 },
  { name: "Sliding Window", count: 10 },
  { name: "Stack", count: 15 },
  { name: "Binary Search", count: 15 },
  { name: "Linked List", count: 15 },
  { name: "Trees", count: 30 },
  { name: "Tries", count: 8 },
  { name: "Heap / Priority Queue", count: 12 },
  { name: "Backtracking", count: 12 },
  { name: "Graphs", count: 25 },
  { name: "Advanced Graphs", count: 10 },
  { name: "1-D Dynamic Programming", count: 15 },
  { name: "2-D Dynamic Programming", count: 15 },
  { name: "Greedy", count: 12 },
  { name: "Intervals", count: 10 },
  { name: "Math & Geometry", count: 5 },
  { name: "Bit Manipulation", count: 6 },
];

export const curriculum: Topic[] = [
  {
    slug: "big-o-complexity",
    title: "Big O & Complexity",
    category: "Fundamentals",
    difficulty: "Beginner",
    description: "Learn how to reason about runtime, memory, and algorithm trade-offs.",
    tags: ["Time Complexity", "Space Complexity", "Big O"],
    whyItMatters: "A fast algorithm still loses in interviews if it scales poorly. Complexity helps you compare ideas before coding.",
    intuition: "Imagine a task taking 1 step for a small input and 1,000 steps for a large one. Big O tells you how the effort grows as the input grows.",
    visualExample: "n = 10 → 10 checks; n = 100 → 100 checks; n = 1,000 → 1,000 checks = linear growth.",
    algorithm: "Count each operation in terms of input size and simplify the highest-order term.",
    code: "for (let i = 0; i < n; i++) {\n  work();\n}\n// O(n)",
    complexity: "Time: O(n) | Space: O(1)",
    tips: ["Look for nested loops first.", "Ignore constants when comparing scale.", "Separate work done per iteration from total repeated work."],
    mistakes: ["Confusing O(2n) with O(n).", "Treating constants as the main growth factor.", "Forgetting space costs in memory-heavy designs."],
    relatedPatterns: ["Binary Search", "Sliding Window", "Dynamic Programming"],
  },
  {
    slug: "arrays-strings",
    title: "Arrays & Strings",
    category: "Core Data Structures",
    difficulty: "Beginner",
    description: "Build the mental model for indexing, traversal, and pattern-based problem solving.",
    tags: ["Two Pointers", "Sliding Window", "Prefix Sum"],
    whyItMatters: "Arrays and strings are the most common interview topics because many problems reduce to scanning and comparing positions.",
    intuition: "Think of an array as a row of boxes. Each box has a position, and most problems are solved by moving across those boxes in a careful order.",
    visualExample: "A = [3, 1, 4, 1, 5]; moving from left to right tracks the current maximum and counts frequencies.",
    algorithm: "Traverse, update state, and keep the important invariant true until the end.",
    code: "let max = 0;\nfor (let i = 0; i < arr.length; i++) {\n  max = Math.max(max, arr[i]);\n}\nreturn max;",
    complexity: "Time: O(n) | Space: O(1)",
    tips: ["Know index boundaries before writing loops.", "Use prefix sums when repeated range checks appear.", "Check edge cases like empty and single-item arrays."],
    mistakes: ["Off-by-one errors.", "Using the wrong index after a mutation.", "Treating a string as a non-indexable object."],
    relatedPatterns: ["Two Pointers", "Sliding Window", "Prefix Sum"],
  },
  {
    slug: "linked-lists",
    title: "Linked Lists",
    category: "Core Data Structures",
    difficulty: "Intermediate",
    description: "Understand pointer-heavy structures, reversing links, and cycle detection.",
    tags: ["Reverse", "Fast & Slow", "Cycle Detection"],
    whyItMatters: "Linked lists teach how data moves by pointers instead of indexing, which is crucial for low-level reasoning and interview confidence.",
    intuition: "Each node points to the next. The trick is to preserve the connection before changing it, so the list does not break.",
    visualExample: "Head → 4 → 7 → 9 → null; reversing means redirecting 4.next to null and then re-linking each node in order.",
    algorithm: "Move a prev pointer and a current pointer, redirecting links while keeping the rest of the list connected.",
    code: "let prev = null;\nwhile (head) {\n  const next = head.next;\n  head.next = prev;\n  prev = head;\n  head = next;\n}\nreturn prev;",
    complexity: "Time: O(n) | Space: O(1)",
    tips: ["Save the next node before re-linking.", "Use fast/slow pointers for cycle and middle detection.", "Draw the pointer state on paper when confused."],
    mistakes: ["Losing the original next pointer.", "Never checking null before dereferencing.", "Forgetting to update the head after reversal."],
    relatedPatterns: ["Fast & Slow Pointers", "Reverse", "Cycle Detection"],
  },
  {
    slug: "stacks-queues",
    title: "Stacks & Queues",
    category: "Core Data Structures",
    difficulty: "Beginner",
    description: "Track order, manage undo flows, and solve monotonic problems elegantly.",
    tags: ["Monotonic Stack", "Queue", "Deque"],
    whyItMatters: "Stack and queue problems show up in parsing, scheduling, backtracking, and breadth-first traversal.",
    intuition: "A stack is LIFO: the last item added is the first to leave. A queue is FIFO: the first item added leaves first.",
    visualExample: "Push 1, 2, 3 → stack top = 3; queue front = 1, back = 3.",
    algorithm: "Use push/pop for stack operations and enqueue/dequeue for queue operations while preserving ordering invariants.",
    code: "const stack = [];\nstack.push(5);\nstack.pop();\nconst queue = [];\nqueue.push(5);\nqueue.shift();",
    complexity: "Time: O(1) per operation | Space: O(n)",
    tips: ["Use stack for matching and nesting problems.", "Use queue for level-order or scheduling logic.", "For monotonic logic, keep only the useful items in the structure."],
    mistakes: ["Forgetting queue removal order.", "Using a stack for BFS.", "Not checking empty before peek or pop."],
    relatedPatterns: ["Monotonic Stack", "BFS", "Greedy"],
  },
  {
    slug: "trees-heaps",
    title: "Trees & Heaps",
    category: "Hierarchical Structures",
    difficulty: "Intermediate",
    description: "Explore tree traversal, heaps, and structured search patterns.",
    tags: ["BST", "Traversal", "Priority Queue"],
    whyItMatters: "Trees represent hierarchy and organization. Heaps help maintain the smallest or largest value efficiently.",
    intuition: "A tree is a branching structure. Each node is a decision point; the path from root to leaf usually encodes the current state.",
    visualExample: "Root = 10, left = 5, right = 15; heap property ensures parent <= children for min-heaps.",
    algorithm: "Perform structured traversal or heapify by comparing parent-child relationships and reordering when constraints are broken.",
    code: "function inorder(node) {\n  if (!node) return;\n  inorder(node.left);\n  console.log(node.val);\n  inorder(node.right);\n}",
    complexity: "Time: O(n) for traversals | Space: O(h) recursion stack",
    tips: ["Use recursion carefully when tree depth increases.", "Use level-order traversal for breadth-first tree reasoning.", "Heaps are perfect for top-k and scheduling workloads."],
    mistakes: ["Forgetting null checks.", "Confusing preorder, inorder, and postorder.", "Using a heap where a balanced BST is required."],
    relatedPatterns: ["DFS", "BFS", "Heap / Top K"],
  },
  {
    slug: "graphs",
    title: "Graphs",
    category: "Network Problems",
    difficulty: "Intermediate",
    description: "Visualize connectivity, shortest paths, and graph traversal in motion.",
    tags: ["BFS", "DFS", "Dijkstra"],
    whyItMatters: "Graphs model real-world relationships: roads, dependencies, social links, and state transitions.",
    intuition: "Think of nodes as locations and edges as roads. Traversal answers: which places are reachable, and what is the cheapest route?",
    visualExample: "A → B (2), B → C (3), A → C (10); BFS explores layers while Dijkstra keeps the smallest known distance.",
    algorithm: "Track visited nodes, maintain queue or priority queue, and update distances or connections as graph exploration proceeds.",
    code: "const queue = [start];\nvisited.add(start);\nwhile (queue.length) {\n  const node = queue.shift();\n  for (const next of neighbors[node]) {\n    if (!visited.has(next)) visited.add(next), queue.push(next);\n  }\n}",
    complexity: "Time: O(V + E) for BFS/DFS | O((V + E) log V) for Dijkstra",
    tips: ["Use BFS when edges cost the same.", "Use Dijkstra when weights differ and all distances are non-negative.", "Track parent pointers for path reconstruction."],
    mistakes: ["Forgetting visited tracking.", "Using the wrong queue/stack semantics.", "Using Dijkstra on negative-weight edges."],
    relatedPatterns: ["BFS", "DFS", "Shortest Path"],
  },
  {
    slug: "recursion-backtracking",
    title: "Backtracking & Recursion",
    category: "Algorithms",
    difficulty: "Intermediate",
    description: "Learn how to choose, explore, and undo decisions in recursive search.",
    tags: ["Subsets", "N-Queens", "Permutations"],
    whyItMatters: "Backtracking is the structured way to explore many possibilities while pruning branches that cannot work.",
    intuition: "The algorithm tries a choice, explores the consequences, and then undoes that choice before trying a new one.",
    visualExample: "For subsets, choose include or exclude each element, then roll back before trying the next branch.",
    algorithm: "At each recursive call, make a choice, recurse, then undo the choice to restore the previous state.",
    code: "function dfs(i) {\n  if (i === n) return;\n  choose(i);\n  dfs(i + 1);\n  undo(i);\n}",
    complexity: "Often exponential, but pruned by constraints and branch ordering",
    tips: ["State restoration is the key to correctness.", "Use pruning early to cut impossible branches.", "Draw the recursion tree before writing a complex version."],
    mistakes: ["Not undoing changes.", "Forgetting base cases.", "Exploring too many branches with no pruning."],
    relatedPatterns: ["DFS", "Recursion", "Dynamic Programming"],
  },
  {
    slug: "dynamic-programming",
    title: "Dynamic Programming",
    category: "Advanced",
    difficulty: "Advanced",
    description: "Translate state transitions into efficient solutions with tables and intuition.",
    tags: ["Memoization", "Tabulation", "LCS"],
    whyItMatters: "DP turns repeated work into reusable results. It is the difference between brute force and optimal solutions in many optimization problems.",
    intuition: "If a problem can be broken into smaller versions of itself, you can store computed answers and reuse them instead of recomputing.",
    visualExample: "A DP table stores the best value for each state such as: minimum cost for first i items and j capacity.",
    algorithm: "Define a state, a transition, and a base case, then compute each value once in a top-down or bottom-up order.",
    code: "const dp = Array(n + 1).fill(0);\nfor (let i = 1; i <= n; i++) {\n  dp[i] = Math.max(dp[i - 1], dp[i - 2] + value[i]);\n}",
    complexity: "Depends on state definition; often O(n²) or O(mn)",
    tips: ["Start by naming the state clearly.", "Identify overlap and optimal substructure.", "Choose memoization or tabulation based on call structure."],
    mistakes: ["Confusing state definitions.", "Forgetting base cases.", "Using repeated recursion without memoization."],
    relatedPatterns: ["Dynamic Programming", "Backtracking", "Greedy"],
  },
  {
    slug: "greedy-intervals",
    title: "Greedy & Intervals",
    category: "Advanced",
    difficulty: "Intermediate",
    description: "Solve scheduling and selection problems by making the best local decision.",
    tags: ["Activity Selection", "Intervals", "Huffman"],
    whyItMatters: "Greedy algorithms work when the locally best choice is part of a globally optimal strategy.",
    intuition: "When the data is sorted and each decision only depends on the current best option, greedy is often the simplest correct strategy.",
    visualExample: "Interval scheduling picks the earliest finishing task first, then continues without overlap.",
    algorithm: "Sort by the right constraint, then take the next task if it does not conflict with the current choice.",
    code: "intervals.sort((a, b) => a.end - b.end);\nlet lastEnd = -Infinity;\nfor (const interval of intervals) {\n  if (interval.start >= lastEnd) {\n    take(interval);\n    lastEnd = interval.end;\n  }\n}",
    complexity: "Time: O(n log n) after sorting | Space: O(1) or O(n)",
    tips: ["Greedy usually needs sorted input.", "Prove the choice is safe before trusting it.", "Check if a counterexample breaks the intuition."],
    mistakes: ["Picking the earliest start instead of the earliest end.", "Ignoring sorting before selection.", "Assuming greedy always works without proof."],
    relatedPatterns: ["Intervals", "Sorting", "Priority Queue"],
  },
  {
    slug: "trie-segment-tree",
    title: "Trie & Segment Tree",
    category: "Advanced Structures",
    difficulty: "Advanced",
    description: "Work with prefix problems, range queries, and efficient search storage.",
    tags: ["Prefix Search", "Fenwick", "Sparse Table"],
    whyItMatters: "These structures optimize repeated searches and range computations that would otherwise be too slow.",
    intuition: "A trie branches by characters or bits. A segment tree stores interval summaries so range queries can be answered quickly without scanning everything.",
    visualExample: "A trie stores words by prefixes, while a segment tree stores sums or minima for ranges like [3, 8].",
    algorithm: "Build a branching tree for characters or a balanced binary tree for interval summaries, then query efficiently.",
    code: "class TrieNode {\n  constructor() { this.children = new Map(); this.isEnd = false; }\n}\n",
    complexity: "Trie: O(length) | Segment tree: O(log n) per query",
    tips: ["Use trie when prefix operations dominate.", "Use segment tree when range queries need recomputation.", "Keep storage consistent across updates and queries."],
    mistakes: ["Forgetting the terminal node mark in trie.", "Not handling range boundaries carefully.", "Rebuilding data unnecessarily in hot loops."],
    relatedPatterns: ["Prefix Sum", "Binary Search", "Fenwick Tree"],
  },
];

export const patterns: Pattern[] = [
  {
    title: "Two Pointers",
    description: "Move multiple pointers in a coordinated way to shrink the search space.",
    whenToUse: "Sorted arrays, palindrome checks, pair sum problems, and in-place removal.",
    complexity: "O(n) time, O(1) extra space",
  },
  {
    title: "Sliding Window",
    description: "Maintain a dynamic range while expanding and shrinking based on constraints.",
    whenToUse: "String and array subarrays with a max or min constraint like at most k distinct elements.",
    complexity: "O(n) time, O(1) to O(k) space",
  },
  {
    title: "Binary Search",
    description: "Cut the search space in half by comparing the target to the middle element.",
    whenToUse: "Sorted inputs, answer search, lower bound, and upper bound problems.",
    complexity: "O(log n) time, O(1) space",
  },
  {
    title: "Monotonic Stack",
    description: "Track indices with a stack while preserving order for nearest greater or smaller values.",
    whenToUse: "Next greater, previous smaller, histogram, and stock-span style problems.",
    complexity: "O(n) time, O(n) space",
  },
  {
    title: "DFS",
    description: "Traverse all reachable nodes deeply before backing out to another branch.",
    whenToUse: "Connected components, island problems, tree traversal, and graph exploration.",
    complexity: "O(V + E) time, O(V) space",
  },
  {
    title: "Dynamic Programming",
    description: "Break a problem into reusable states and compute the best answer from smaller subproblems.",
    whenToUse: "Optimization, counting, subsequences, and grid traversal with overlap or dependency.",
    complexity: "Depends on state size; often O(n²) or O(mn)",
  },
];

export const lessonBySlug = Object.fromEntries(curriculum.map((topic) => [topic.slug, topic]));

export type TopicKnowledge = {
  definition: string;
  keyConcepts: string[];
  operations: string[];
  useCases: string[];
  checklist: string[];
};

export const topicKnowledge: Record<string, TopicKnowledge> = {
  "big-o-complexity": {
    definition: "Complexity analysis describes how an algorithm's time and memory usage grow as input size increases.",
    keyConcepts: ["Big O describes an upper growth trend, not an exact stopwatch time.", "Drop constants and lower-order terms when comparing scale.", "Time and auxiliary space are measured separately."],
    operations: ["Count dominant loops and recursive branches.", "Multiply costs for nested work; add costs for sequential phases.", "Use amortized analysis when occasional expensive operations are spread across many cheap ones."],
    useCases: ["Choosing between brute force and an optimized approach.", "Explaining why a solution will scale in an interview.", "Finding the bottleneck in production code."],
    checklist: ["What is n?", "What is the dominant operation?", "Can repeated work be cached, sorted, or eliminated?"],
  },
  "arrays-strings": {
    definition: "Arrays store values in indexed positions; strings are ordered character sequences that support scanning and pattern operations.",
    keyConcepts: ["Random access by index is O(1), while inserting in the middle usually shifts values.", "A string scan can maintain counts, windows, or pointer invariants.", "Prefix sums convert repeated range totals into constant-time queries after preprocessing."],
    operations: ["Traverse, index, swap, sort, slice, and build frequency maps.", "Use two pointers for inward scans and sliding windows for contiguous ranges.", "Use a hash set or map when membership or frequency matters."],
    useCases: ["Filtering logs, processing text, ranking data, and image grids.", "Pair-sum, substring, subarray, and matrix interview problems.", "Streaming data where a window summarizes recent input."],
    checklist: ["Mark the valid index range.", "Decide whether the answer is contiguous.", "Test empty input, duplicates, and a one-element input."],
  },
  "linked-lists": {
    definition: "A linked list is a chain of nodes where each node stores data and a reference to another node.",
    keyConcepts: ["Nodes provide sequential access rather than random indexing.", "The head is the entry point; null marks the end of a linear list.", "Fast and slow pointers reveal cycles, middles, and meeting points."],
    operations: ["Insert or remove by rewiring references.", "Reverse with prev, current, and next pointers.", "Merge sorted lists by repeatedly choosing the smaller current node."],
    useCases: ["LRU caches, browser history, playlists, and adjacency chains.", "Problems where frequent local insertion is more important than indexing.", "Cycle detection and pointer manipulation interviews."],
    checklist: ["Save next before changing a link.", "Handle an empty list and a one-node list.", "Check whether the head or tail changes."],
  },
  "stacks-queues": {
    definition: "A stack removes the most recently added item first; a queue removes the earliest added item first.",
    keyConcepts: ["LIFO makes stacks useful for nesting and undo behavior.", "FIFO makes queues useful for fairness and breadth-first exploration.", "A deque supports efficient work at both ends."],
    operations: ["Stack: push, pop, and peek.", "Queue: enqueue, dequeue, and front.", "Monotonic structures remove dominated values while preserving useful order."],
    useCases: ["Parsing parentheses, browser history, task scheduling, and BFS.", "Next greater element, histogram, and stock-span problems.", "Producer-consumer pipelines and rate-limited work."],
    checklist: ["State what leaves first.", "Define behavior for an empty structure.", "Track indices when values alone are not enough."],
  },
  "trees-heaps": {
    definition: "Trees organize values hierarchically; heaps maintain a minimum or maximum at the root under a parent-child ordering rule.",
    keyConcepts: ["Depth is distance from the root; height is the longest downward path.", "DFS follows branches; BFS follows levels.", "A binary search tree orders left values below and right values above a node."],
    operations: ["Traverse preorder, inorder, postorder, or level order.", "Insert, search, and delete while preserving tree rules.", "Push and pop heap values while restoring the heap property."],
    useCases: ["File systems, expression trees, schedulers, priority queues, and autocomplete.", "Top-k selection and streaming minimum/maximum queries.", "Hierarchy, dependency, and range-search problems."],
    checklist: ["Define the base case for null.", "Choose DFS or BFS based on the question.", "Track whether balance or ordering must be preserved."],
  },
  graphs: {
    definition: "A graph is a set of vertices connected by directed or undirected edges, optionally carrying weights.",
    keyConcepts: ["An adjacency list is efficient for sparse graphs; a matrix is direct for dense graphs.", "Visited state prevents repeated work and infinite cycles.", "BFS finds shortest unweighted paths; Dijkstra handles non-negative weights."],
    operations: ["Build adjacency lists from edges.", "Traverse with BFS or DFS and record parents.", "Relax weighted edges or join components with a disjoint-set structure."],
    useCases: ["Road networks, social connections, dependency ordering, and web crawling.", "Connectivity, shortest path, cycle, and island problems.", "Scheduling tasks with prerequisites."],
    checklist: ["Clarify directed versus undirected.", "Ask whether edges have weights.", "Mark nodes when they enter the frontier, not only when removed."],
  },
  "recursion-backtracking": {
    definition: "Recursion solves a problem through smaller calls; backtracking explores choices and restores state after each branch.",
    keyConcepts: ["Every recursive solution needs a base case and progress toward it.", "The call stack stores the current path.", "Pruning rejects impossible branches before they expand."],
    operations: ["Choose a candidate, recurse, then undo the choice.", "Track the current path, remaining options, and constraints.", "Order choices to find useful answers earlier and prune more aggressively."],
    useCases: ["Permutations, subsets, sudoku, queens, word search, and constraint puzzles.", "Tree and graph DFS.", "Generating combinations or testing possible arrangements."],
    checklist: ["Name the state passed to the next call.", "Write the base case first.", "Verify every mutation has a matching undo."],
  },
  "dynamic-programming": {
    definition: "Dynamic programming stores solutions to overlapping subproblems and combines them through a recurrence.",
    keyConcepts: ["A state describes the smallest information needed for the future.", "A transition connects a state to smaller or previous states.", "Memoization is top-down; tabulation is bottom-up."],
    operations: ["Define states and base cases.", "Write the transition before choosing an iteration order.", "Reduce dimensions only after proving older states are no longer needed."],
    useCases: ["Optimization, counting, subsequences, grids, strings, and resource allocation.", "Replacing exponential recursion with polynomial work.", "Problems with overlapping subproblems and optimal substructure."],
    checklist: ["What does dp[i] or dp[i][j] mean in one sentence?", "Which prior states are required?", "What is the smallest valid input?"],
  },
  "greedy-intervals": {
    definition: "Greedy algorithms repeatedly choose the best-looking local option when that choice can be proven safe globally.",
    keyConcepts: ["The sorting key exposes the constraint that controls future choices.", "An exchange argument often proves that a local choice can replace another choice.", "Intervals are usually modeled by start and end boundaries."],
    operations: ["Sort by finish, start, cost, or another problem-specific key.", "Accept a choice when it preserves feasibility.", "Track the current boundary, capacity, or best remaining resource."],
    useCases: ["Scheduling, merging ranges, resource allocation, compression, and routing.", "Minimum number of rooms, non-overlapping activities, and jump reachability.", "Fast approximations when exact optimization is unnecessary."],
    checklist: ["State the greedy choice precisely.", "Try to construct a counterexample.", "Explain why sorting order makes the choice safe."],
  },
  "trie-segment-tree": {
    definition: "A trie stores keys by shared prefixes; a segment tree stores summaries for intervals and answers range queries quickly.",
    keyConcepts: ["Trie depth equals key length, making prefix operations independent of the number of stored words.", "Segment tree nodes represent ranges and combine child summaries.", "Updates and queries usually follow a logarithmic path."],
    operations: ["Insert, search, and prefix-check in a trie.", "Build, query, and update a segment tree.", "Choose a sum, minimum, maximum, or custom associative summary."],
    useCases: ["Autocomplete, spell checking, IP routing, range sums, and live dashboards.", "Many updates mixed with many interval queries.", "Prefix and range problems where scanning all values is too slow."],
    checklist: ["Define the node or interval represented.", "Handle missing children and empty ranges.", "Keep query and update boundaries consistent."],
  },
};

export type LearningExample = {
  label: "Even example" | "Odd example";
  title: string;
  input: string;
  currentStep: string;
  nextStep: string;
  result: string;
};

export const topicExamples: Record<string, LearningExample[]> = {
  "big-o-complexity": [
    { label: "Even example", title: "Linear scan", input: "arr = [2, 4, 6, 8]", currentStep: "Check one item at a time, so the first step inspects 2.", nextStep: "Continue to 4, 6, and 8; four items means four checks.", result: "The work grows with n: O(n)." },
    { label: "Odd example", title: "Nested comparison", input: "arr = [1, 3, 5]", currentStep: "The outer loop chooses 1 and the inner loop compares it with the remaining items.", nextStep: "Repeat comparisons for 3 and 5; the same input is revisited.", result: "Two loops over n produce O(n²) growth." },
  ],
  "arrays-strings": [
    { label: "Even example", title: "Two pointers", input: "[2, 4, 6, 8], target = 10", currentStep: "Left points to 2 and right points to 8; their sum is 10.", nextStep: "Because the target is found, stop without scanning the middle again.", result: "Return the pair at indexes 0 and 3." },
    { label: "Odd example", title: "Sliding window", input: "s = 'abc', window limit = 2", currentStep: "Expand to 'a', then 'ab'; both windows are valid.", nextStep: "Adding 'c' makes three characters, so remove 'a' before continuing.", result: "The longest valid window has length 2." },
  ],
  "linked-lists": [
    { label: "Even example", title: "Reverse two nodes", input: "2 → 4 → null", currentStep: "Save 4, then point 2.next to null.", nextStep: "Move to 4 and point 4.next to 2.", result: "The new head is 4: 4 → 2 → null." },
    { label: "Odd example", title: "Find the middle", input: "1 → 3 → 5 → null", currentStep: "Slow moves one node and fast moves two nodes.", nextStep: "When fast reaches the end, slow is at 3.", result: "The middle node is 3." },
  ],
  "stacks-queues": [
    { label: "Even example", title: "Stack matching", input: "tokens = ['(', '[', ']', ')']", currentStep: "Push '(' and '[' because they open groups.", nextStep: "']' matches '[' and ')' matches '(', so pop both.", result: "The stack is empty: the expression is balanced." },
    { label: "Odd example", title: "Queue levels", input: "queue = [A, B, C]", currentStep: "Dequeue A first and add its neighbors to the back.", nextStep: "Then dequeue B, then C; older work always leaves first.", result: "The visit order follows FIFO: A, B, C." },
  ],
  "trees-heaps": [
    { label: "Even example", title: "Inorder BST", input: "root 4, left 2, right 6", currentStep: "Visit the left subtree before visiting 4.", nextStep: "Visit 4, then traverse the right subtree.", result: "Inorder produces sorted output: 2, 4, 6." },
    { label: "Odd example", title: "Min-heap insert", input: "heap = [2, 5, 7], insert 1", currentStep: "Place 1 at the end, then compare it with parent 5.", nextStep: "Swap upward again with 2 until the parent is smaller.", result: "The root becomes 1 and heap order is restored." },
  ],
  graphs: [
    { label: "Even example", title: "BFS reachability", input: "A → B → C", currentStep: "Put A in the queue and mark it visited.", nextStep: "Remove A, add B, then remove B and add C.", result: "C is reachable in two edges." },
    { label: "Odd example", title: "Weighted route", input: "A-B = 2, B-C = 3, A-C = 8", currentStep: "Start with distance A = 0 and relax edge A-B to 2.", nextStep: "From B, distance to C becomes 5, which beats 8.", result: "The cheapest route is A → B → C with cost 5." },
  ],
  "recursion-backtracking": [
    { label: "Even example", title: "Subsets of [2]", input: "choices = include 2 or skip 2", currentStep: "Choose include: the path becomes [2].", nextStep: "Undo the choice, then choose skip: the path becomes [].", result: "The two subsets are [2] and []." },
    { label: "Odd example", title: "Place one queen", input: "board size = 3", currentStep: "Try row 0, column 0 and mark its column and diagonals.", nextStep: "If the next row has no safe column, undo and try column 1.", result: "Invalid branches are pruned instead of explored fully." },
  ],
  "dynamic-programming": [
    { label: "Even example", title: "Climbing stairs", input: "n = 4", currentStep: "dp[1] = 1 and dp[2] = 2 are the base cases.", nextStep: "Compute dp[3] = dp[2] + dp[1], then dp[4] = dp[3] + dp[2].", result: "There are 5 ways to reach step 4." },
    { label: "Odd example", title: "Coin change", input: "coins = [1, 3], amount = 4", currentStep: "dp[0] = 0; amount 1 uses one coin.", nextStep: "For amount 4, reuse dp[3] after taking coin 1 or dp[1] after taking coin 3.", result: "The minimum is 2 coins: 1 + 3." },
  ],
  "greedy-intervals": [
    { label: "Even example", title: "Activity selection", input: "[1, 2], [2, 4], [1, 5]", currentStep: "Sort by finish time and take [1, 2] first.", nextStep: "[2, 4] starts at the boundary, so take it; [1, 5] overlaps.", result: "Two compatible activities are selected." },
    { label: "Odd example", title: "Jump game", input: "reach = [2, 3, 1, 1, 4]", currentStep: "At index 0, the farthest reachable position is 2.", nextStep: "Index 1 extends reach to 4, so the end becomes reachable.", result: "The array can be completed with local farthest-reach choices." },
  ],
  "trie-segment-tree": [
    { label: "Even example", title: "Trie prefix", input: "words = ['cat', 'car'], query = 'ca'", currentStep: "Follow c, then a; both words share this path.", nextStep: "Stop at a and report that the prefix exists.", result: "'ca' matches two stored words without scanning all words." },
    { label: "Odd example", title: "Range sum", input: "values = [1, 2, 3, 4], query = [1, 3]", currentStep: "Visit the segment nodes that cover indexes 1 through 3.", nextStep: "Combine their stored sums instead of reading every unrelated index.", result: "The range sum is 2 + 3 + 4 = 9." },
  ],
};

export const patternExamples: Record<string, LearningExample[]> = {
  "Two Pointers": [
    { label: "Even example", title: "Pair sum", input: "[2, 4, 6, 8], target 10", currentStep: "Check 2 + 8 = 10 at the two ends.", nextStep: "Return immediately because the sorted pair matches.", result: "The answer is [2, 8]." },
    { label: "Odd example", title: "Palindrome", input: "'level'", currentStep: "Compare l and l, then move both pointers inward.", nextStep: "Compare e and e; the pointers meet at v.", result: "Every pair matches, so it is a palindrome." },
  ],
  "Sliding Window": [
    { label: "Even example", title: "Fixed window", input: "[2, 4, 6, 8], k = 2", currentStep: "Start with [2, 4] and sum it to 6.", nextStep: "Remove 2 and add 6; the next window [4, 6] sums to 10.", result: "The window moves in O(n) time." },
    { label: "Odd example", title: "Valid substring", input: "'aab', at most 1 distinct", currentStep: "Expand through 'aa'; one distinct character is valid.", nextStep: "Adding b creates two, so shrink from the left until valid again.", result: "The longest valid substring is 'aa'." },
  ],
  "Binary Search": [
    { label: "Even example", title: "Find 6", input: "[2, 4, 6, 8]", currentStep: "Check middle value 4; target 6 is to the right.", nextStep: "Check 6 in the remaining half and stop.", result: "The target is found in logarithmic steps." },
    { label: "Odd example", title: "Lower bound", input: "[1, 3, 5], target 4", currentStep: "Middle is 3, so move right; 5 is now the first value at least 4.", nextStep: "Store 5 and continue left to prove no earlier value qualifies.", result: "The lower bound index is 2." },
  ],
  "Monotonic Stack": [
    { label: "Even example", title: "Next greater", input: "[2, 4, 3]", currentStep: "Push 2; 4 is greater, so 4 answers 2's query.", nextStep: "Push 4, then push 3 because it is not greater than 4.", result: "The next greater value for 2 is 4." },
    { label: "Odd example", title: "Daily temperatures", input: "[3, 5, 4]", currentStep: "Push day 0; day 1 is warmer, so resolve day 0.", nextStep: "Keep day 1 and push day 2 until a warmer day appears.", result: "The stack stores unresolved decreasing temperatures." },
  ],
  DFS: [
    { label: "Even example", title: "Tree traversal", input: "root 2 with children 1 and 3", currentStep: "Visit 2, then recursively enter the left child 1.", nextStep: "Backtrack to 2 and enter the right child 3.", result: "DFS visits one branch deeply before another." },
    { label: "Odd example", title: "Island fill", input: "grid cell (0, 0) is land", currentStep: "Mark the cell visited and inspect four directions.", nextStep: "Visit connected land, stopping at water or boundaries.", result: "One connected component is counted once." },
  ],
  "Dynamic Programming": [
    { label: "Even example", title: "Reuse a state", input: "ways to reach step 4", currentStep: "Compute smaller states 1, 2, and 3 once.", nextStep: "Use states 2 and 3 to form state 4 instead of recursing again.", result: "Repeated work is replaced by stored answers." },
    { label: "Odd example", title: "Grid paths", input: "2 × 3 grid", currentStep: "The first row and column each have one path.", nextStep: "Each inner cell adds paths from above and from the left.", result: "The final cell contains the total path count." },
  ],
};

export type LessonIndexItem = {
  id: string;
  topicSlug: string;
  topicTitle: string;
  title: string;
  format: string;
  summary: string;
  difficulty: Difficulty;
};

export type VisualModule = {
  id: string;
  topicSlug: string;
  topicTitle: string;
  title: string;
  kind: string;
  description: string;
  animation: string;
};

const lessonFormats = [
  "Mental model", "Visual walkthrough", "Trace the state", "Code reading", "Complexity clinic", "Edge-case lab", "Pattern recognition", "Invariant check", "Interview prompt", "Common mistake", "Worked example", "Counterexample", "Pointer movement", "State transition", "Table construction", "Recursion tree", "Graph traversal", "Proof sketch", "Optimization pass", "Debugging drill", "Input anatomy", "Output prediction", "Implementation plan", "Pseudocode lab", "Language translation", "Test design", "Boundary conditions", "Memory map", "Time budget", "Trade-off study", "Refactor challenge", "Compare approaches", "Choose the data structure", "Build from scratch", "Explain it aloud", "Flash review", "Timed exercise", "Hint ladder", "Solution debrief", "Pattern pairing", "Failure mode", "Scaling experiment", "Visual recap", "Algorithm journal", "Interview follow-up", "Reusable template", "Small-to-large", "Brute force first", "Optimal transition", "Complexity proof", "Final checkpoint", "Mixed practice", "Mastery review",
];

export const lessonLibrary: LessonIndexItem[] = curriculum.flatMap((topic) => lessonFormats.map((format, index) => ({
  id: `${topic.slug}-${index + 1}`,
  topicSlug: topic.slug,
  topicTitle: topic.title,
  title: `${format}: ${topic.title}`,
  format,
  summary: `${format} for ${topic.title.toLowerCase()}, with a concrete example, visual state, and a practice checkpoint.`,
  difficulty: topic.difficulty,
})));

const visualFormats = [
  ["State timeline", "Step through the changing algorithm state.", "motion-float"],
  ["Pointer tracker", "See indexes and pointers move across the input.", "motion-pulse"],
  ["Operation counter", "Compare how work grows as input size changes.", "motion-scan"],
  ["Decision tree", "Follow choices, branches, and backtracking paths.", "motion-orbit"],
  ["Data structure map", "Watch values enter, leave, and reconnect.", "motion-shimmer"],
  ["Complexity radar", "Compare time and space trade-offs visually.", "motion-float"],
] as const;

export const visualModules: VisualModule[] = curriculum.flatMap((topic) => visualFormats.map(([kind, description, animation], index) => ({
  id: `${topic.slug}-visual-${index + 1}`,
  topicSlug: topic.slug,
  topicTitle: topic.title,
  title: `${topic.title} · ${kind}`,
  kind,
  description,
  animation,
})));

export const roadmapSteps = [
  { title: "Complexity", slug: "big-o-complexity" },
  { title: "Arrays", slug: "arrays-strings" },
  { title: "Strings", slug: "arrays-strings" },
  { title: "Hashing", slug: "arrays-strings" },
  { title: "Two Pointers", slug: "arrays-strings" },
  { title: "Sliding Window", slug: "arrays-strings" },
  { title: "Linked Lists", slug: "linked-lists" },
  { title: "Stack", slug: "stacks-queues" },
  { title: "Queue", slug: "stacks-queues" },
  { title: "Binary Search", slug: "trees-heaps" },
  { title: "Trees", slug: "trees-heaps" },
  { title: "Heap", slug: "trees-heaps" },
  { title: "Graphs", slug: "graphs" },
  { title: "Greedy", slug: "greedy-intervals" },
  { title: "Backtracking", slug: "recursion-backtracking" },
  { title: "Dynamic Programming", slug: "dynamic-programming" },
];

export const problemCards: ProblemCard[] = [
  { id: 1, title: "Two Sum", difficulty: "Easy", pattern: "Hashing", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/two-sum/", status: "Solved" },
  { id: 121, title: "Best Time to Buy and Sell Stock", difficulty: "Easy", pattern: "Two Pointers", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", status: "Attempted" },
  { id: 217, title: "Contains Duplicate", difficulty: "Easy", pattern: "Hashing", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/contains-duplicate/", status: "Practice" },
  { id: 238, title: "Product of Array Except Self", difficulty: "Medium", pattern: "Prefix Product", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/", status: "Practice" },
  { id: 53, title: "Maximum Subarray", difficulty: "Medium", pattern: "Kadane's Algorithm", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/", status: "Practice" },
  { id: 152, title: "Maximum Product Subarray", difficulty: "Medium", pattern: "Dynamic Programming", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/maximum-product-subarray/", status: "Practice" },
  { id: 153, title: "Find Minimum in Rotated Sorted Array", difficulty: "Medium", pattern: "Binary Search", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", status: "Practice" },
  { id: 33, title: "Search in Rotated Sorted Array", difficulty: "Medium", pattern: "Binary Search", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/", status: "Practice" },
  { id: 15, title: "3Sum", difficulty: "Medium", pattern: "Two Pointers", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/3sum/", status: "Practice" },
  { id: 11, title: "Container With Most Water", difficulty: "Medium", pattern: "Two Pointers", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/", status: "Practice" },
  { id: 42, title: "Trapping Rain Water", difficulty: "Hard", pattern: "Two Pointers", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/", status: "Practice" },
  { id: 560, title: "Subarray Sum Equals K", difficulty: "Medium", pattern: "Prefix Sum", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/subarray-sum-equals-k/", status: "Practice" },
  { id: 48, title: "Rotate Image", difficulty: "Medium", pattern: "Matrix", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/rotate-image/", status: "Practice" },
  { id: 73, title: "Set Matrix Zeroes", difficulty: "Medium", pattern: "Matrix", topic: "Arrays", leetcodeUrl: "https://leetcode.com/problems/set-matrix-zeroes/", status: "Practice" },
  { id: 76, title: "Minimum Window Substring", difficulty: "Hard", pattern: "Sliding Window", topic: "Strings", leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/", status: "Practice" },
  { id: 200, title: "Number of Islands", difficulty: "Medium", pattern: "DFS", topic: "Graphs", leetcodeUrl: "https://leetcode.com/problems/number-of-islands/", status: "Practice" },
  { id: 704, title: "Binary Search", difficulty: "Easy", pattern: "Binary Search", topic: "Searching", leetcodeUrl: "https://leetcode.com/problems/binary-search/", status: "Solved" },
  { id: 322, title: "Coin Change", difficulty: "Medium", pattern: "Dynamic Programming", topic: "DP", leetcodeUrl: "https://leetcode.com/problems/coin-change/", status: "Practice" },
];

export const dashboardMetrics = [
  { label: "Problems Solved", value: 24, color: "cyan" },
  { label: "Current Streak", value: 9, color: "emerald" },
  { label: "Topics Mastered", value: 7, color: "violet" },
  { label: "Weak Areas", value: 3, color: "amber" },
];

export const lessonSamples = [
  { title: "Arrays & Strings", slug: "arrays-strings", difficulty: "Beginner", summary: "Use a moving pair to eliminate wasteful scans." },
  { title: "Linked Lists", slug: "linked-lists", difficulty: "Intermediate", summary: "Maintain a valid subarray while the window expands or shrinks." },
  { title: "Trees & Heaps", slug: "trees-heaps", difficulty: "Intermediate", summary: "Divide the answer space and keep only the relevant half." },
  { title: "Dynamic Programming", slug: "dynamic-programming", difficulty: "Advanced", summary: "Find the optimal substructure and learn from smaller states." },
];
