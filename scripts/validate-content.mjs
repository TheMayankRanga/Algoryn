import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const filesToCheck = [
  "src/lib/content.ts",
  "src/app/page.tsx",
  "src/app/learn/page.tsx",
  "src/app/patterns/page.tsx",
  "src/app/visualizers/page.tsx",
  "src/app/roadmap/page.tsx",
  "src/app/leetcode/page.tsx",
  "src/app/practice/page.tsx",
  "src/app/interview/page.tsx",
  "src/app/progress/page.tsx",
  "src/app/cheatsheets/page.tsx",
  "src/app/search/page.tsx",
  "src/app/problems/[id]/page.tsx",
  "src/components/global-search.tsx",
  "src/components/progress-dashboard.tsx",
  "src/components/topic-quiz.tsx",
  "src/lib/quiz-data.ts",
  "src/lib/progress.ts",
  "src/lib/user-name.ts",
  "src/components/user-name-gate.tsx",
  "src/components/user-profile.tsx",
];

const missing = filesToCheck.filter((file) => !fs.existsSync(path.join(root, file)));

if (missing.length > 0) {
  console.error("Missing required files:");
  missing.forEach((file) => console.error(`- ${file}`));
  process.exit(1);
}

const content = fs.readFileSync(path.join(root, "src/lib/content.ts"), "utf8");
const requiredTerms = [
  "curriculum",
  "patterns",
  "roadmapSteps",
  "problemCards",
  "lessonSamples",
  "topicKnowledge",
  "topicExamples",
  "patternExamples",
  "lessonLibrary",
  "visualModules",
];

const failures = requiredTerms.filter((term) => !content.includes(term));

if (failures.length > 0) {
  console.error("Missing content exports:");
  failures.forEach((term) => console.error(`- ${term}`));
  process.exit(1);
}

const quizContent = fs.readFileSync(path.join(root, "src/lib/quiz-data.ts"), "utf8");
if (!quizContent.includes("topicQuizData")) {
  console.error("Missing quiz data export: topicQuizData");
  process.exit(1);
}

console.log("Content validation passed: required DSA content exports and pages are present.");
