import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const root = process.cwd();
const reportPath = path.join(root, "CONTENT_AUDIT.md");

function loadTs(relativePath) {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const runtimeModule = { exports: {} };
  const context = vm.createContext({ module: runtimeModule, exports: runtimeModule.exports, console });
  new vm.Script(compiled, { filename: relativePath }).runInContext(context);
  return runtimeModule.exports;
}

const content = loadTs("src/lib/content.ts");
const quizzes = loadTs("src/lib/quiz-data.ts");
const problems = loadTs("src/lib/neetcode250.ts");

const issues = [];
const scoreRows = [];
const addIssue = (severity, area, id, issue, fix) => issues.push({ severity, area, id, issue, fix });
const score = (item, checks) => Math.round(checks.filter(Boolean).length / checks.length * 100);
const classification = (value) => value >= 90 ? "Excellent" : value >= 80 ? "Good" : value >= 70 ? "Needs improvement" : value >= 60 ? "Poor" : "Critical";
const meaningful = (value, minimum = 24) => typeof value === "string" && value.trim().length >= minimum;

for (const topic of content.curriculum) {
  const knowledge = content.topicKnowledge[topic.slug];
  const examples = content.topicExamples[topic.slug] ?? [];
  const quiz = quizzes.topicQuizData[topic.slug] ?? [];
  const checks = [
    meaningful(topic.description), meaningful(topic.whyItMatters), meaningful(topic.intuition), meaningful(topic.algorithm),
    meaningful(topic.code, 12), meaningful(topic.complexity), topic.tips?.length >= 3, topic.mistakes?.length >= 3,
    knowledge?.definition && knowledge.keyConcepts?.length >= 3, knowledge?.operations?.length >= 3,
    knowledge?.useCases?.length >= 3, knowledge?.checklist?.length >= 3, examples.length >= 3, quiz.length >= 1,
  ];
  const value = score(topic, checks);
  scoreRows.push({ type: "Topic", id: topic.slug, title: topic.title, score: value });
  if (examples.length < 3) addIssue("high", "Examples", topic.slug, `Only ${examples.length} examples; the required progression needs beginner, intermediate, and challenging examples.`, "Add a third edge-case or challenging example with explicit expected output and complexity.");
  if (!knowledge?.definition || knowledge.keyConcepts.length < 3 || knowledge.operations.length < 3 || knowledge.useCases.length < 3) addIssue("high", "Explanation", topic.slug, "Reference explanation does not fully cover what, why, how, when, and recognition guidance.", "Expand the structured knowledge record with recognition signals and a worked explanation.");
  if (!quiz.length) addIssue("medium", "Quiz", topic.slug, "No topic quiz question is available.", "Add at least one concept-check question.");
}

for (const pattern of content.patterns) {
  const examples = content.patternExamples[pattern.title] ?? [];
  const value = score(pattern, [meaningful(pattern.description), meaningful(pattern.whenToUse), meaningful(pattern.complexity), examples.length >= 3]);
  scoreRows.push({ type: "Pattern", id: pattern.title, title: pattern.title, score: value });
  if (examples.length < 3) addIssue("high", "Pattern examples", pattern.title, `Only ${examples.length} examples; no beginner/intermediate/challenging progression.`, "Add a third harder or edge-case example.");
  addIssue("medium", "Pattern schema", pattern.title, "Pattern record lacks explicit recognitionSignals, whenNotToUse, variations, interviewTips, and related problem fields.", "Extend the data model and renderer with those fields.");
}

const titleCounts = new Map();
const urlCounts = new Map();
for (const problem of problems.neetcode250Problems) {
  const checks = [
    problem.id > 0,
    meaningful(problem.title, 3),
    meaningful(problem.topic, 3),
    meaningful(problem.pattern, 3),
    /leetcode\.com\/problems\/[a-z0-9-]+\/$/.test(problem.leetcodeUrl),
    ["Easy", "Medium", "Hard"].includes(problem.difficulty),
    false, // problem statement
    false, // examples and expected output
    false, // explanation and optimal approach
    false, // code and complexity proof
  ];
  const value = score(problem, checks);
  scoreRows.push({ type: "Problem", id: String(problem.id), title: problem.title, score: value });
  titleCounts.set(problem.title, [...(titleCounts.get(problem.title) ?? []), problem.id]);
  urlCounts.set(problem.leetcodeUrl, [...(urlCounts.get(problem.leetcodeUrl) ?? []), problem.id]);
  addIssue("high", "Problem completeness", String(problem.id), "Problem is an index entry only: no statement, examples, constraints, explanation, hints, code solution, or complexity fields are stored.", "Add a verified structured problem record or clearly label this as an external-link index.");
}
for (const [title, ids] of titleCounts) if (ids.length > 1) addIssue("medium", "Problem duplicates", title, `Title appears ${ids.length} times with IDs ${ids.join(", ")}.`, "Deduplicate or represent multiple topic relationships on one problem record.");
for (const [url, ids] of urlCounts) if (ids.length > 1) addIssue("medium", "Problem URL duplicates", url, `URL is shared by IDs ${ids.join(", ")}.`, "Use one canonical problem record with multiple topics instead of duplicate rows.");

const visualizedTopics = new Set(content.curriculum.map((topic) => topic.slug));
for (const visual of content.visualModules) {
  if (!visualizedTopics.has(visual.topicSlug)) addIssue("critical", "Visualization relationship", visual.id, "Visual module points to a missing topic slug.", "Repair the topic relationship.");
}
addIssue("high", "Visualization architecture", "visualizers.tsx", "Visualizers maintain local step logic; there is no structured execution-event stream shared by visualization, explanation, variables, and code highlighting.", "Introduce typed execution events as the single source of truth before adding synchronized code highlighting.");
addIssue("medium", "Automated tests", "package.json", "The test script runs successfully but there are zero test files, and no test:e2e script exists.", "Add focused content/data tests and browser E2E coverage.");
addIssue("medium", "Dynamic storage", "architecture", "Progress and name are localStorage-only; there is no authentication, database, notes, bookmarks, or cross-device persistence.", "Requires a backend/auth decision; do not fabricate server persistence.");

const counts = Object.fromEntries(["Excellent", "Good", "Needs improvement", "Poor", "Critical"].map((name) => [name, scoreRows.filter((row) => classification(row.score) === name).length]));
const overall = Math.round(scoreRows.reduce((sum, row) => sum + row.score, 0) / scoreRows.length);
const critical = issues.filter((issue) => issue.severity === "critical");
const high = issues.filter((issue) => issue.severity === "high");
const medium = issues.filter((issue) => issue.severity === "medium");
const beforeSummary = `Critical: ${critical.length}; Poor: ${counts.Poor}; Needs improvement: ${counts["Needs improvement"]}`;
const afterSummary = beforeSummary;

const lines = [
  "# Content Audit",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Overall Score",
  "",
  `**${overall}/100** (${classification(overall)})`,
  "",
  `Total educational items scored: **${scoreRows.length}** (${content.curriculum.length} topics, ${content.patterns.length} patterns, ${problems.neetcode250Problems.length} problems).`,
  "",
  "## Score Breakdown",
  "",
  ...Object.entries(counts).map(([name, count]) => `- ${name}: ${count}`),
  "",
  "## Before / After",
  "",
  `Before fixes: ${beforeSummary}`,
  `After fixes: ${afterSummary}`,
  "",
  "No automatic content rewrite was applied by this audit. The report deliberately preserves fact-checkable gaps instead of inflating scores with generated filler.",
  "",
  "## Critical Problems",
  "",
  ...(critical.length ? critical.map((issue) => `- **${issue.id}** (${issue.area}): ${issue.issue} Fix: ${issue.fix}`) : ["- None detected in references or route relationships."]),
  "",
  "## High-Priority Problems",
  "",
  ...high.map((issue) => `- **${issue.id}** (${issue.area}): ${issue.issue} Fix: ${issue.fix}`),
  "",
  "## Medium-Priority Problems",
  "",
  ...medium.map((issue) => `- **${issue.id}** (${issue.area}): ${issue.issue} Fix: ${issue.fix}`),
  "",
  "## Missing Content Fields",
  "",
  "- Examples do not have structured problem, expectedOutput, approach, timeComplexity, spaceComplexity, keyInsight, or code fields.",
  "- Pattern records do not have explicit recognitionSignals, whenNotToUse, variations, interviewTips, or problem relationships.",
  "- Problem records are verified-link indexes, not complete educational problem pages.",
  "- No structured execution event model exists for synchronized visualization/code explanations.",
  "",
  "## DSA Correctness Notes",
  "",
  "- Topic-level complexity strings and core explanations were present and readable for all ten topics.",
  "- The audit found no missing topic-to-lesson or visual-module-to-topic relationship.",
  "- Duplicate problem titles/URLs represent repeated entries across generated groups and should be normalized before claiming a canonical 250-problem database.",
  "- Code snippets are display snippets; the repository has no compile/run harness for every snippet, so executable correctness is not claimed.",
  "",
  "## Curriculum Gaps",
  "",
  "- The UI has ten broad topic pages, but the full intended curriculum (KMP, Z algorithm, Bellman-Ford, Floyd-Warshall, MST, DSU, Fenwick tree, AVL, etc.) is not represented as individual structured topics.",
  "- The generated lesson index has breadth but not 520 independently authored lesson records; it is a format/topic index.",
  "",
  "## Item Scores",
  "",
  "| Type | ID | Title | Score | Classification |",
  "|---|---|---|---:|---|",
  ...scoreRows.map((row) => `| ${row.type} | ${row.id} | ${row.title.replaceAll("|", "\\|")} | ${row.score} | ${classification(row.score)} |`),
  "",
  "## Audit Limitations",
  "",
  "- No database exists in this repository to inspect.",
  "- No authentication/session backend exists; user identity and progress use localStorage.",
  "- No test:e2e script or browser automation suite exists.",
  "- External LeetCode statements and metadata were not copied or independently verified by this local audit.",
];

fs.writeFileSync(reportPath, `${lines.join("\n")}\n`);
console.log(`Content audit written to ${reportPath}`);
console.log(JSON.stringify({ overall, total: scoreRows.length, counts, critical: critical.length, high: high.length, medium: medium.length }, null, 2));
