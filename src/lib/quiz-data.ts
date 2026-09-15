export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

export const topicQuizData: Record<string, QuizQuestion[]> = {
  "big-o-complexity": [{ question: "Which grows more slowly as n increases?", options: ["O(n²)", "O(n)", "O(2ⁿ)"], answer: "O(n)", explanation: "Linear growth adds a fixed amount of work per item." }],
  "arrays-strings": [{ question: "Which pattern is best for a contiguous range with a changing constraint?", options: ["Sliding Window", "DFS", "Heap"], answer: "Sliding Window", explanation: "A window expands and shrinks while preserving a valid range." }],
  "linked-lists": [{ question: "Which pointers commonly find the middle of a linked list?", options: ["Left and right", "Fast and slow", "Parent and child"], answer: "Fast and slow", explanation: "Fast moves twice as quickly, so slow reaches the middle when fast finishes." }],
  "stacks-queues": [{ question: "Which structure is FIFO?", options: ["Stack", "Queue", "Heap"], answer: "Queue", explanation: "A queue removes the earliest item first." }],
  "trees-heaps": [{ question: "What does inorder traversal of a valid BST produce?", options: ["Sorted values", "Random values", "Only leaves"], answer: "Sorted values", explanation: "It visits left subtree, node, then right subtree." }],
  graphs: [{ question: "Which traversal finds shortest paths in an unweighted graph?", options: ["BFS", "DFS", "Heapify"], answer: "BFS", explanation: "BFS explores one distance layer at a time." }],
  "recursion-backtracking": [{ question: "What must happen after exploring a backtracking choice?", options: ["Keep every mutation", "Undo the choice", "Sort the input"], answer: "Undo the choice", explanation: "Restoring state lets the next branch start cleanly." }],
  "dynamic-programming": [{ question: "What makes DP useful?", options: ["Overlapping subproblems", "Unsorted input only", "No base cases"], answer: "Overlapping subproblems", explanation: "DP stores repeated subproblem answers instead of recomputing them." }],
  "greedy-intervals": [{ question: "What must a greedy choice usually have?", options: ["A correctness argument", "A random guess", "An exponential branch"], answer: "A correctness argument", explanation: "A local choice is safe only when it can be justified globally." }],
  "trie-segment-tree": [{ question: "Which structure is designed for prefix lookup?", options: ["Trie", "Queue", "Stack"], answer: "Trie", explanation: "Trie paths share characters from the beginning of stored words." }],
};
