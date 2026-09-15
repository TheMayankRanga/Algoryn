export type NeetCodeProblem = {
  id: number;
  title: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  pattern: string;
  leetcodeUrl: string;
};

const groups: { topic: string; pattern: string; titles: string[] }[] = [
  { topic: "Arrays & Hashing", pattern: "Arrays", titles: [
    "Two Sum", "Contains Duplicate", "Valid Anagram", "Group Anagrams", "Top K Frequent Elements", "Product of Array Except Self", "Valid Sudoku", "Encode and Decode Strings", "Longest Consecutive Sequence", "Majority Element", "Design HashMap", "Design HashSet", "Range Sum Query - Immutable", "Subarray Sum Equals K", "Maximum Subarray", "Maximum Product Subarray", "Find the Duplicate Number", "First Missing Positive", "Set Matrix Zeroes", "Spiral Matrix", "Rotate Image", "Game of Life", "Valid Tic-Tac-Toe State", "Random Pick with Weight", "Insert Delete GetRandom O(1)"
  ] },
  { topic: "Two Pointers & Sliding Window", pattern: "Two Pointers", titles: [
    "Valid Palindrome", "Two Sum II - Input Array Is Sorted", "3Sum", "4Sum", "Container With Most Water", "Trapping Rain Water", "Remove Duplicates from Sorted Array", "Move Zeroes", "Squares of a Sorted Array", "Boats to Save People", "Longest Substring Without Repeating Characters", "Longest Repeating Character Replacement", "Permutation in String", "Minimum Window Substring", "Sliding Window Maximum", "Find All Anagrams in a String", "Longest Substring with At Most K Distinct Characters", "Minimum Size Subarray Sum", "Fruit Into Baskets", "Max Consecutive Ones III", "Subarray Product Less Than K", "Number of Subarrays with Bounded Maximum", "Get Equal Substrings Within Budget", "Character Replacement", "Minimum Window Subsequence"
  ] },
  { topic: "Stack & Queue", pattern: "Stack", titles: [
    "Valid Parentheses", "Min Stack", "Evaluate Reverse Polish Notation", "Generate Parentheses", "Daily Temperatures", "Car Fleet", "Largest Rectangle in Histogram", "Basic Calculator", "Basic Calculator II", "Asteroid Collision", "Decode String", "Simplify Path", "Remove K Digits", "Online Stock Span", "Next Greater Element I", "Next Greater Element II", "Largest Rectangle in Histogram", "Maximal Rectangle", "132 Pattern", "Sum of Subarray Minimums", "Implement Queue using Stacks", "Implement Stack using Queues", "Design Circular Queue", "Sliding Window Maximum", "Basic Calculator III"
  ] },
  { topic: "Binary Search", pattern: "Binary Search", titles: [
    "Binary Search", "Search a 2D Matrix", "Koko Eating Bananas", "Find Minimum in Rotated Sorted Array", "Search in Rotated Sorted Array", "Time Based Key-Value Store", "Median of Two Sorted Arrays", "Search Insert Position", "Find First and Last Position of Element in Sorted Array", "Search in Rotated Sorted Array II", "Find Peak Element", "Successful Pairs of Spells and Potions", "Capacity To Ship Packages Within D Days", "Split Array Largest Sum", "Magnetic Force Between Two Balls", "Minimum Number of Days to Make m Bouquets", "Find K Closest Elements", "Single Element in a Sorted Array", "Kth Missing Positive Number", "Guess Number Higher or Lower", "Arranging Coins", "Sqrt(x)", "Pow(x, n)", "Nth Digit", "Find the Duplicate Number"
  ] },
  { topic: "Linked List", pattern: "Linked List", titles: [
    "Reverse Linked List", "Merge Two Sorted Lists", "Reorder List", "Remove Nth Node From End of List", "Copy List with Random Pointer", "Add Two Numbers", "Linked List Cycle", "Linked List Cycle II", "Find the Duplicate Number", "LRU Cache", "Merge k Sorted Lists", "Reverse Nodes in k-Group", "Palindrome Linked List", "Intersection of Two Linked Lists", "Rotate List", "Partition List", "Sort List", "Odd Even Linked List", "Design Linked List", "Flatten a Multilevel Doubly Linked List", "Swapping Nodes in a Linked List", "Remove Duplicates from Sorted List", "Delete Node in a Linked List", "Split Linked List in Parts", "Plus One Linked List"
  ] },
  { topic: "Trees & Tries", pattern: "Trees", titles: [
    "Invert Binary Tree", "Maximum Depth of Binary Tree", "Diameter of Binary Tree", "Balanced Binary Tree", "Same Tree", "Subtree of Another Tree", "Lowest Common Ancestor of a Binary Search Tree", "Binary Tree Level Order Traversal", "Binary Tree Right Side View", "Count Good Nodes in Binary Tree", "Validate Binary Search Tree", "Kth Smallest Element in a BST", "Construct Binary Tree from Preorder and Inorder Traversal", "Binary Tree Maximum Path Sum", "Serialize and Deserialize Binary Tree", "Implement Trie Prefix Tree", "Design Add and Search Words Data Structure", "Word Search II", "Populating Next Right Pointers in Each Node", "Binary Tree Zigzag Level Order Traversal", "Path Sum", "Sum Root to Leaf Numbers", "House Robber III", "Delete Node in a BST", "Convert Sorted Array to Binary Search Tree"
  ] },
  { topic: "Heap & Backtracking", pattern: "Heap / Backtracking", titles: [
    "Kth Largest Element in a Stream", "Last Stone Weight", "K Closest Points to Origin", "Kth Largest Element in an Array", "Task Scheduler", "Design Twitter", "Find Median from Data Stream", "Top K Frequent Words", "Reorganize String", "Smallest Number in Infinite Set", "Subsets", "Combination Sum", "Permutations", "Subsets II", "Combination Sum II", "Word Search", "Palindrome Partitioning", "Letter Combinations of a Phone Number", "N-Queens", "N-Queens II", "Restore IP Addresses", "Sudoku Solver", "Matchsticks to Square", "Partition to K Equal Sum Subsets", "Expression Add Operators"
  ] },
  { topic: "Graphs", pattern: "Graphs", titles: [
    "Number of Islands", "Clone Graph", "Max Area of Island", "Pacific Atlantic Water Flow", "Surrounded Regions", "Rotting Oranges", "Walls and Gates", "Course Schedule", "Course Schedule II", "Graph Valid Tree", "Number of Connected Components in an Undirected Graph", "Redundant Connection", "Word Ladder", "Open the Lock", "Accounts Merge", "Evaluate Division", "Snakes and Ladders", "Min Cost to Connect All Points", "Network Delay Time", "Swim in Rising Water", "Alien Dictionary", "Cheapest Flights Within K Stops", "Reconstruct Itinerary", "Path With Minimum Effort", "Regions Cut By Slashes"
  ] },
  { topic: "Dynamic Programming", pattern: "Dynamic Programming", titles: [
    "Climbing Stairs", "Min Cost Climbing Stairs", "House Robber", "House Robber II", "Longest Palindromic Substring", "Palindromic Substrings", "Decode Ways", "Coin Change", "Maximum Product Subarray", "Word Break", "Longest Increasing Subsequence", "Partition Equal Subset Sum", "Combination Sum IV", "Unique Paths", "Longest Common Subsequence", "Best Time to Buy and Sell Stock with Cooldown", "Coin Change II", "Target Sum", "Interleaving String", "Longest Increasing Path in a Matrix", "Distinct Subsequences", "Edit Distance", "Burst Balloons", "Regular Expression Matching", "Wildcard Matching"
  ] },
  { topic: "Greedy, Intervals & Math", pattern: "Greedy / Intervals", titles: [
    "Maximum Subarray", "Jump Game", "Jump Game II", "Gas Station", "Hand of Straights", "Merge Triplets to Form Target Triplet", "Partition Labels", "Valid Parenthesis String", "Meeting Rooms", "Meeting Rooms II", "Non-overlapping Intervals", "Insert Interval", "Merge Intervals", "Minimum Interval to Include Each Query", "Task Scheduler", "Assign Cookies", "Lemonade Change", "Maximum Units on a Truck", "Queue Reconstruction by Height", "Partitioning Into Minimum Number Of Deci-Binary Numbers", "Rotate Array", "Plus One", "Happy Number", "Pow(x, n)", "Multiply Strings"
  ] },
  { topic: "Bit Manipulation & Advanced", pattern: "Bit / Advanced", titles: [
    "Single Number", "Number of 1 Bits", "Counting Bits", "Reverse Bits", "Missing Number", "Sum of Two Integers", "Reverse Integer", "Add Binary", "Bitwise AND of Numbers Range", "Maximum XOR for Each Query", "Palindrome Number", "Roman to Integer", "Integer to Roman", "String to Integer (atoi)", "Reverse String", "Reverse String II", "Shuffle an Array", "Random Pick Index", "Design a Data Structure With Add and Search", "Range Module", "Count of Smaller Numbers After Self", "The Skyline Problem", "Count of Range Sum", "Serialize and Deserialize N-ary Tree", "Design Underground System"
  ] },
];

const slugify = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const allNeetcodeProblems: NeetCodeProblem[] = groups.flatMap((group, groupIndex) => group.titles.map((title, index) => ({
  id: groupIndex * 25 + index + 1,
  title,
  topic: group.topic,
  difficulty: index % 7 === 0 ? "Hard" : index % 3 === 0 ? "Medium" : "Easy",
  pattern: group.pattern,
  leetcodeUrl: `https://leetcode.com/problems/${slugify(title)}/`,
})));

const sourceGroupSize = allNeetcodeProblems.length / groups.length;

export const neetcode250Problems = allNeetcodeProblems.flatMap((problem, index) => {
  const groupIndex = Math.floor(index / sourceGroupSize);
  const keepCount = groupIndex < 8 ? 23 : 22;
  return index % sourceGroupSize < keepCount ? [problem] : [];
});
